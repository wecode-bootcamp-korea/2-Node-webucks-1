import {
  createUser,
  findUserByEmail,
  hardDeleteUser,
  softDeleteUser,
} from '../models/userDAO';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { errorHandler, ERRORS } from '../constants';
import { joinUserProcess } from '../utils';

export const joinUserService = errorHandler.wrapper(async (body, next) => {
  const { email } = body;
  const isUserExist = await findUserByEmail(email, next);

  return joinUserProcess(createUser)(hash)(body, isUserExist, next);
});

export const loginUserService = async (terms, next) => {
  const { email } = terms;
  const isUserExist = await findUserByEmail(email, next);

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
