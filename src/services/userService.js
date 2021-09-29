import {
  createUser,
  findUserByEmail,
  hardDeleteUser,
  softDeleteUser,
} from '../models/userDAO';
import { hash, compare } from 'bcrypt';
import { errorHandler, ERRORS } from '../constants';
import { ifOk } from '../utils';

export const joinService = errorHandler.wrapper(async (body, next) => {
  const { email } = body;
  const isUserExist = await findUserByEmail(email, next);

  if (isUserExist.length) body.password = await hash(body.password);

  return !!isUserExist.length
    ? createUser(body, next)
    : { error: ERRORS.EXIST };
});

export const loginService = async (body, next) => {
  const { email } = body;
  const user = await findUserByEmail(email, next);
  const args = {
    isOk: !!user.length,
    arg: [password, user[0].password],
  };

  const isPwOk = await ifOk(compare)(args);
  if (isPwOk) {
  }

  return { error: ERRORS.INVALID };

  let token;

  try {
  } catch (e) {
    next(e);
  }

  return { ok: true, token };
};

export const hardDeleteService = async (id, next) => {
  return hardDeleteUser(id, next);
};

export const softDeleteService = async (id, next) => {
  return softDeleteUser(id, next);
};
