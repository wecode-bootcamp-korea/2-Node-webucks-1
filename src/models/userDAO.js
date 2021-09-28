import client from '.';
import { ERRORS, ROLES } from '../constances';

export const findUserByEmail = async (email, next) => {
  try {
    return client.$queryRaw`
    SELECT * 
    FROM 
      users u 
    WHERE 
      u.email=${email};
    `;
  } catch (e) {
    next(e);
  }
};

export const createUser = async (email, password, nickName = '익명', next) => {
  try {
    await client.$queryRaw`
    INSERT INTO 
      users(
        email,
        password,
        nick_name
        ) 
    VALUES(
      ${email},
      ${password},
      ${nickName}
      );
    `;

    const data = await findUserByEmail(email, next);

    if (data.length) {
      delete data[0].password;
      delete data[0].id;
      delete data[0].updated_at;
    }
    return {
      ok: true,
      ...(Array.isArray(data) ? { data: data[0] } : { data }),
    };
  } catch (e) {
    next(e);
  }
};

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
