import { SUCCESS } from '../constants';
import client from '.';
import { errorHandler, ERRORS, ROLES } from '../constants';

export const findUserByEmail = async (email, next) => {
  try {
    return client.$queryRaw`
    SELECT 
      u.email,
      u.created_at,
      u.nick_name,
      u.password
    FROM 
      users u 
    WHERE 
      u.email=${email};
    `;
  } catch (e) {
    next(e);
  }
};

export const createUser = errorHandler.wrapper(
  async ({ email, hashedPassword, nickName = null }, next) => {
    await client.$queryRaw`
    INSERT INTO 
      users(
        email,
        password,
        nick_name
        ) 
    VALUES(
      ${email},
      ${hashedPassword},
      ${nickName}
      );
    `;

    const user = await findUserByEmail(email, next);

    return { message: SUCCESS.CREATE, user: user[0] };
  }
);

export const findUserById = async (id, next) => {
  try {
    return client.$queryRaw`
      SELECT u.id 
      FROM users u
      WHERE
        id=${id};
    `;
  } catch (e) {
    next(e);
  }
};

export const auth = async (id, next) => {
  const me = await findUserById(id, next);
  if (!me.length) {
    return {
      ok: false,
      error: ERRORS.UNAUTH,
    };
  } else {
    return {
      ok: true,
      data: me,
    };
  }
};

export const softDeleteUser = async (id, next) => {
  try {
    await client.user.update({
      where: {
        id,
      },
      data: {
        role: ROLES.DELETEDUSER,
        deletedAt: new Date(),
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    next(e);
  }
};

export const hardDeleteUser = async (id, next) => {
  try {
    client.user.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    next(e);
  }
};
