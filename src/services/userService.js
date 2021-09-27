import { createUser, findUserByEmail } from '../models/userDAO';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ERRORS } from '../constances';

export const joinService = async (email, password, next) => {
  const isExist = await findUserByEmail(email, next);

  if (isExist.length) {
    return {
      ok: false,
      error: ERRORS.EXIST,
    };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return createUser(email, hashedPassword, next);
  } catch (e) {
    next(e);
  }
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

  try {
    const token = jwt.sign({ id: existUser[0].id }, process.env.SECRET);
    return { ok: true, token };
  } catch (e) {
    next(e);
  }
};
