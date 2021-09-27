import { ERRORS } from '../constances';
import {
  createComment,
  createCommentlike,
  createRecomment,
  deleteComment,
  deleteCommentLike,
  findCommentByIds,
  updateComment,
} from '../models/commentDAO';
import { findProductById } from '../models/productDAO';
import { auth } from '../models/userDAO';

export const createCommentService = async (
  userId,
  coffeeId,
  description,
  next
) => {
  const isCoffeeExist = await findProductById(coffeeId, next);

  if (!isCoffeeExist.length) {
    return {
      ok: false,
      error: ERRORS.NOITEM(),
    };
  }

  const isAuth = await auth(userId, next);

  const createdComment = await createComment(
    userId,
    coffeeId,
    description,
    next
  );

  createdComment.data.nick_name = createdComment.data.nick_name || '익명';

  return !isAuth.ok ? auth(userId, next) : createdComment;
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
