import {
  createUser,
  findUserByEmail,
  hardDeleteUser,
  softDeleteUser,
} from '../models/userDAO';
import { hash, compare } from 'bcrypt';
import { ERRORS, SUCCESS } from '../constants';
import { sign } from 'jsonwebtoken';
import { ifOk } from '../utils';

export const joinService = async (body, next) => {
  const { email, password } = body;

  const hashPw = async () => (body.password = await hash(password, 10));

  const e = { status: 400, message: ERRORS.EXIST };
  const user = await findUserByEmail(email, next);
  await ifOk(hashPw)({ isOk: !user.length, body, e, next });
  return createUser(body, next);
};

export const loginService = async ({ email, password }, next) => {
  const checkPwCorrect = async hashedPw => await compare(password, hashedPw);
  const makeToken = payload => sign(payload, process.env.SECRET);

  const user = await findUserByEmail(email, next);
  const isOk = !!user.length;
  let body = isOk ? user[0].password : null;
  const e = { message: ERRORS.INVALID, status: 400 };
  const isPwOk = await ifOk(checkPwCorrect)({ isOk, e, body, next });

  body = { id: user[0]['id'] };
  return ifOk(makeToken)({ isOk: isPwOk, e, next, body });
};

export const hardDeleteService = async (id, next) => {
  return hardDeleteUser(id, next);
};

export const softDeleteService = async (id, next) => {
  return softDeleteUser(id, next);
};
