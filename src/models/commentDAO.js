import client from './index';

export const createComment = async (userId, description, next) => {
  try {
    await client.$queryRaw`
      INSERT INTO
        comments(
          description,
          users_id)
      VALUES(
        ${description},
        ${userId}
        );
    `;

    const data = await findCommentByCreatedAt(next);
    return {
      data,
      ok: true,
    };
  } catch (e) {
    next(e);
  }
};

const findCommentByCreatedAt = async next => {
  try {
    const data = await client.$queryRaw`
      SELECT 
        c.id,
        c.created_at,
        c.description
      FROM comments c
      ORDER BY 
        created_at DESC
    `;

    return data[0];
  } catch (e) {
    next(e);
  }
};

export const findCommentByIds = async (userId, commentId, next) => {
  try {
    return client.$queryRaw`
    SELECT *
    FROM comments c
    WHERE 
      users_id=${userId}
    AND
      id=${commentId}
  `;
  } catch (e) {
    next(e);
  }
};

export const deleteComment = async (commentId, next) => {
  try {
    await client.$queryRaw`
    DELETE 
    FROM comments
    WHERE
      id=${commentId}
    `;

    return {
      ok: true,
    };
  } catch (e) {
    next(e);
  }
};

export const updateComment = async (commentId, description, next) => {
  try {
    await client.$queryRaw`
      UPDATE comments
      SET 
        description=${description}
      WHERE
        id=${commentId};
    `;

    return {
      ok: true,
    };
  } catch (e) {
    next(e);
  }
};
