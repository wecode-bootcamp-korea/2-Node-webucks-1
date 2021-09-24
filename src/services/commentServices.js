import {
  createComment,
  createCommentlike,
  createRecomment,
  deleteComment,
  deleteCommentLike,
  findCommentByIds,
  updateComment,
} from '../models/commentDAO';
import { auth } from '../models/userDAO';

export const createCommentService = async (userId, description, next) => {
  const isAuth = await auth(userId, next);
  return !isAuth.ok
    ? auth(userId, next)
    : await createComment(userId, description, next);
};

export const updateCommentService = async (
  userId,
  commentId,
  description,
  next
) => {
  const isAuth = await auth(userId, next);
  if (!isAuth.ok) {
    return isAuth;
  }

  const isCommentExist = await findCommentByIds(userId, commentId, next);
  if (!isCommentExist.length) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    });
  }
  return updateComment(commentId, description, next);
};

export const deleteCommentService = async (userId, commentId, next) => {
  const isAuth = await auth(userId, next);
  if (!isAuth.ok) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
  }
  const commentExist = await findCommentByIds(userId, commentId, next);
  if (!commentExist.length) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    });
  }

  return deleteComment(commentId, next);
};

export const createRecommentService = async (
  userId,
  commentId,
  description,
  next
) => {
  const isAuth = await auth(userId, next);

  if (!isAuth.ok) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
  }

  return createRecomment(userId, commentId, description, next);
};

export const createCommentLikeService = async (userId, commentId, next) => {
  const isAuth = await auth(userId, next);

  if (!isAuth.ok) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
  }

  const isCommentExist = await findCommentByIds(userId, commentId, next);

  if (!isCommentExist.length) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    });
  }

  return createCommentlike(userId, commentId, next);
};

export const deleteCommentLikeService = async (userId, commentId, next) => {
  const isAuth = await auth(userId, next);
  if (!isAuth.ok) return isAuth;

  return deleteCommentLike(userId, commentId, next);
};