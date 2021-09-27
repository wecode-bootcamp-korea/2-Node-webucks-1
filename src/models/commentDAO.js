import client from './index';

//사용하지 않는 함수(coffee 1개 가져오는 select 쿼리에 모두 조인 시킴-> offset 이 잘 안될 경우 이 함수 사용 예정)
export const findCommentsByCoffeeId = async (userId, coffeeId, next) => {
  try {
    return client.$queryRaw`
    SELECT 
      c.id,
      c.created_at,
      c.description,
      c.users_id,
    FROM commens c
      LEFT OUTER JOIN comments_likes cl ON cl.comments_id=c.id
      JOIN users u ON cl.users_id
    WHERE
        c.coffees_id=${coffeeId}
      AND
        u.id=${userId}
    ORDER BY
      createdAt ASC;
    `;
  } catch (e) {
    next(e);
  }
};

export const createComment = async (userId, coffeeId, description, next) => {
  try {
    await client.$queryRaw`
      INSERT INTO
        comments(
          description,
          coffees_id,
          users_id
          )
        VALUES(
          ${description},
          ${coffeeId},
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
        c.description,
        u.nick_name
      FROM comments c
      JOIN users u ON u.id=c.users_id 
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

export const createRecomment = async (userId, commentId, description, next) => {
  try {
    await client.$queryRaw`
    INSERT INTO
      re_comments(
        description,
        users_id,
        comments_id
        )
    VALUES(
      ${description},
      ${userId},
      ${commentId}
      );
    `;

    const data = await findRecommentByCreatedAt(userId, next);
    return {
      ok: true,
      data: data[0],
    };
  } catch (e) {
    next(e);
  }
};

export const findRecommentByCreatedAt = async (userId, next) => {
  try {
    return client.$queryRaw`
      SELECT 
        r.id,
        r.created_at,
        r.description
      FROM re_comments r
      WHERE
        users_id=${userId}
      ORDER BY
        created_at DESC;
    `;
  } catch (e) {
    next(e);
  }
};

export const createCommentlike = async (userId, commentId, next) => {
  try {
    await client.$queryRaw`
      INSERT INTO
      comments_likes(
        users_id,
        comments_id
        )
      VALUES(
        ${userId},
        ${commentId}
        );
    `;

    return {
      ok: true,
    };
  } catch (e) {
    next(e);
  }
};

export const deleteCommentLike = async (userId, commentId, next) => {
  const isExist = await findCommentLikeByIds(userId, commentId, next);
  if (!isExist.ok) {
    return isExist;
  }

  try {
    await client.$queryRaw`
    DELETE 
    FROM comments_likes
    WHERE
      id=${isExist.data.id}
    `;
  } catch (e) {
    next(e);
  }

  return {
    ok: true,
  };
};

export const findCommentLikeByIds = async (userId, commentId, next) => {
  try {
    const isExist = await client.$queryRaw`
    SELECT l.id
    FROM comments_likes l
    WHERE
        comments_id=${commentId}
      AND
        users_id=${userId};
    `;

    if (!isExist.length) {
      return {
        ok: false,
        error: '수정권한이 없습니다.',
      };
    } else {
      return {
        ok: true,
        data: isExist[0],
      };
    }
  } catch (e) {
    next(e);
  }
};
