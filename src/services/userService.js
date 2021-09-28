import {
  createUser,
  findUserByEmail,
  hardDeleteUser,
  softDeleteUser,
} from '../models/userDAO';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ERRORS } from '../constances';

export const joinService = async (email, password, nickName, next) => {
  const isExist = await findUserByEmail(email, next);

  if (isExist.length) {
    return {
      ok: false,
      error: ERRORS.EXIST,
    };
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (e) {
    next(e);
  }

  return createUser(email, hashedPassword, nickName, next);
};

export const loginService = async (email, password, next) => {
  const existUser = await findUserByEmail(email, next);
  if (!existUser.length) {
    return {
      ok: false,
      error: ERRORS.INVALID,
    };
  }

  const isPassCorrect = await bcrypt.compare(password, existUser[0].password);

  if (!isPassCorrect) {
    return {
      ok: false,
      error: ERRORS.INVALID,
    };
  }

  let token;

  try {
    token = jwt.sign({ id: existUser[0].id }, process.env.SECRET);
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
