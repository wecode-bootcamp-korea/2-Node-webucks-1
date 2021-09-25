import { json } from 'express';
import { ERRORS } from '../constances';
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
    locals: { userId },
  } = res;

  const {
    body: { description },
  } = req;
  console.log(
    '댓글에 커피 아뒤가 안달려 이거 검사도 안한다..커피 아뒤 검사 해야 할꺼아냐..있는지 없는지'
  );

  if (!description || !description.length) {
    res.status(400).json({ ok: false, error: ERRORS.NOPARAMS });
    return;
  }

  if (!userId) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
    return;
  }

  const data = await createCommentService(userId, description, next);
  res.json(data);
  return;
};

export const updateComment = async (req, res, next) => {
  const {
    locals: { userId },
  } = res;

  const {
    params: { id: commentId },
    body: { description },
  } = req;

  if (!commentId || !description) {
    res.status(400).json({ ok: false, error: ERRORS.INVALID });
    return;
  }

  if (!userId) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
    return;
  }
  const data = await updateCommentService(userId, commentId, description, next);
  res.json(data);
  return;
};

export const deleteComment = async (req, res, next) => {
  const {
    locals: { userId },
  } = res;

  const {
    params: { id: commentId },
  } = req;

  if (!commentId) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    });
    return;
  }

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
    locals: { userId },
  } = res;

  const {
    body: { description },
    params: { id: commentId },
  } = req;

  if (!commentId) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    });
    return;
  }

  if (!userId) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
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
    locals: { userId },
  } = res;
  const {
    params: { id: commentId },
  } = req;

  if (!userId) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
  }

  if (!commentId) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    });
  }

  const data = await createCommentLikeService(userId, commentId, next);
  res.json(data);
  return;
};

export const deleteCommentLike = async (req, res, next) => {
  const {
    locals: { userId },
  } = res;
  const {
    params: { id: commentId },
  } = req;

  if (!userId) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
  }

  if (!commentId) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    });
  }

  const data = await deleteCommentLikeService(userId, commentId, next);
  res.json(data);
  return;
};
