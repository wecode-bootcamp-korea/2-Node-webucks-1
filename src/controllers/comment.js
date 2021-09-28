import { ERRORS } from '../constants';
import {
  createCommentLikeService,
  createCommentService,
  createRecommentService,
  deleteCommentLikeService,
  deleteCommentService,
  updateCommentService,
} from '../services/commentServices';

export const createComment = async (req, res, next) => {
  const {
    locals: {
      user: { id: userId },
    },
  } = res;

  const {
    params: { coffeeId },
    body: { description },
  } = req;

  if (!description.length) {
    res.status(400).json({ ok: false, error: ERRORS.NOPARAMS });
    return;
  }

  const data = await createCommentService(userId, coffeeId, description, next);
  res.json(data);
  return;
};

export const updateComment = async (req, res, next) => {
  const {
    params: { id: commentId },
    body: { description },
  } = req;

  if (!description.length) {
    res.status(400).json({ ok: false, error: ERRORS.INVALID });
    return;
  }

  const data = await updateCommentService(userId, commentId, description, next);
  res.json(data);
  return;
};

export const deleteComment = async (req, res, next) => {
  const {
    locals: {
      user: { id: userId },
    },
  } = res;

  const {
    params: { id: commentId },
  } = req;

  if (!userId) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
    return;
  }

  const data = await deleteCommentService(userId, commentId, next);
  res.json(data);
  return;
};

export const createRecomment = async (req, res, next) => {
  const {
    locals: {
      user: { id: userId },
    },
  } = res;

  const {
    body: { description },
    params: { id: commentId },
  } = req;

  if (!description.length) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    });
    return;
  }

  const data = await createRecommentService(
    userId,
    commentId,
    description,
    next
  );

  res.json(data);
  return;
};

export const createCommentlike = async (req, res, next) => {
  const {
    locals: {
      user: { id: userId },
    },
  } = res;
  const {
    params: { id: commentId },
  } = req;
  console.log(userId, commentId);
  const data = await createCommentLikeService(userId, commentId, next);
  res.json(data);
  return;
};

export const deleteCommentLike = async (req, res, next) => {
  const {
    locals: {
      user: { id: userId },
    },
  } = res;

  const {
    params: { id: commentId },
  } = req;

  const data = await deleteCommentLikeService(userId, commentId, next);
  res.json(data);
  return;
};
