import {
  createComment,
  deleteComment,
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
    return {
      ok: false,
      error: '존재하지 않는 댓글입니다.',
    };
  }
  return updateComment(commentId, description, next);
};

export const deleteCommentService = async (userId, commentId, next) => {
  const isAuth = await auth(userId, next);
  if (!isAuth.ok) {
    return {
      ok: false,
      error: '로그인 하세요.',
    };
  }
  const commentExist = await findCommentByIds(userId, commentId, next);
  if (!commentExist.length) {
    return {
      ok: false,
      error: '존재하지 않는 댓글 입니다.',
    };
  }

  return deleteComment(commentId, next);
};
