import { ERRORS, SUCCESS } from '../constants';
import {
  hardDeleteService,
  softDeleteService,
  joinService,
  loginService,
} from '../services/userService';
import { ifOk, isValid } from '../utils';

export const join = async (req, res, next) => {
  const {
    body: { email, password, passwordConfirm },
  } = req;
  const { body } = req;
  const e = { status: 400, message: ERRORS.INVALID };
  const isOk = isValid({ email, password }) && password === passwordConfirm;
  const user = await ifOk(joinService)({ e, body, isOk, next });
  delete user[0].password;
  res.json({ message: SUCCESS.CREATE, user: user[0] });
};

export const login = async (req, res, next) => {
  const { body } = req;
  const e = { status: 400, message: ERRORS.INVALID };
  const isOk = isValid(body);
  const token = await ifOk(loginService)({ e, isOk, body, next });
  res.json({ message: SUCCESS.SUCCESS, token });
};

export const hardDeleteController = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  const data = await hardDeleteService(id, next);
  return res.json(data);
};

export const softDeleteController = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const data = await softDeleteService(id, next);
  return res.json(data);
};
