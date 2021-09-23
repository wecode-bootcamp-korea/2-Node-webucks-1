import {
  createCommentService,
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

  if (!description) {
    return { ok: false, error: '올바른 값을 입력하세요.' };
  }

  if (!userId) {
    return {
      ok: false,
      error: '로그인 해야 이용할 수 있는 기능입니다.',
    };
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
    return { ok: false, error: '올바른 값을 입력하세요.' };
  }

  if (!userId) {
    return {
      ok: false,
      error: '로그인 해야 이용할 수 있는 기능입니다.',
    };
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
    return {
      ok: false,
      error: '올바른 값을 입력하세요.',
    };
  }

  if (!userId) {
    return {
      ok: false,
      error: '로그인 하세요.',
    };
  }

  const data = await deleteCommentService(userId, commentId, next);
  res.json(data);
  return;
};
