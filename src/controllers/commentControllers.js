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
      error: '댓글이 존재하지 않습니다..',
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

export const createRecomment = async (req, res, next) => {
  const {
    locals: { userId },
  } = res;

  const {
    body: { description },
    params: { id: commentId },
  } = req;

  if (!commentId) {
    return {
      ok: false,
      error: '존재하지 않는 댓글 입니다.',
    };
  }

  if (!userId) {
    return {
      ok: false,
      error: '로그인하세요.',
    };
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
    return {
      ok: false,
      error: '로그인 하세요.',
    };
  }

  if (!commentId) {
    return {
      ok: false,
      error: '존재하지 않는 댓글 입니다.',
    };
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
    return {
      ok: false,
      error: '로그인 하세요',
    };
  }

  if (!commentId) {
    return {
      ok: false,
      error: '댓글이 존재하지 않습니다.',
    };
  }

  const data = await deleteCommentLikeService(userId, commentId, next);
  res.json(data);
  return;
};
