import { SUCCESS } from '../constants';
import client from '.';
import { ERRORS, ROLES } from '../constants';

export const findUserByEmail = async (email, next) => {
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
};

export const createUser = async ({ email, password, nickName }, next) => {
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
      ${nickName || null}
      );
    `;

  return findUserByEmail(email, next);
};

export const findUserById = async id => {
  return client.$queryRaw`
      SELECT u.id 
      FROM users u
      WHERE
        id=${id};
    `;
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

export const softDeleteUser = async id => {
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
};

export const hardDeleteUser = async id => {
  client.user.delete({
    where: {
      id,
    },
  });
  return {
    ok: true,
  };
};
