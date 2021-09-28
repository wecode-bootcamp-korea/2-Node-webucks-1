import {
  createComment,
  createCommentlike,
  createRecomment,
  deleteComment,
  deleteCommentLike,
  findCommentByIds,
  updateComment,
} from '../models/commentDAO';
import { ERRORS } from '../constances';
import { findProductById } from '../models/productDAO';

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

  const createdComment = await createComment(
    userId,
    coffeeId,
    description,
    next
  );

  createdComment.data.nick_name = createdComment.data.nick_name || '익명';

  return createdComment;
};

export const updateCommentService = async (
  userId,
  commentId,
  description,
  next
) => {
  const isCommentExist = await findCommentByIds(userId, commentId, next);

  if (!isCommentExist.length) {
    return {
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    };
  }

  return updateComment(commentId, description, next);
};

export const deleteCommentService = async (userId, commentId, next) => {
  const commentExist = await findCommentByIds(userId, commentId, next);
  if (!commentExist.length) {
    return {
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    };
  }

  return deleteComment(commentId, next);
};

export const createRecommentService = async (
  userId,
  commentId,
  description,
  next
) => {
  return createRecomment(userId, commentId, description, next);
};

export const createCommentLikeService = async (userId, commentId, next) => {
  const isCommentExist = await findCommentByIds(userId, commentId, next);

  if (!isCommentExist.length) {
    return {
      ok: false,
      error: ERRORS.NOITEM('댓글이'),
    };
  }

  return createCommentlike(userId, commentId, next);
};

export const deleteCommentLikeService = async (userId, commentId, next) => {
  return deleteCommentLike(userId, commentId, next);
};
