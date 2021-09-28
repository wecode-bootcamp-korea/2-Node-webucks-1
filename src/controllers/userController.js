import { ERRORS } from '../constants';
import {
  hardDeleteService,
  softDeleteService,
  joinUserService,
  loginUserService,
} from '../services/userService';
import { checkTermsValid, isValid, returnErrorOrSuccess } from '../utils';

export const joinUser = async (req, res, next) => {
  const { body } = req;
  const result = await checkTermsValid(joinUserService)(body, next);
  const fun = (result, code) => res.status(code || 201).json(result);
  returnErrorOrSuccess(fun)(result, 401);
};

export const loginUser = async (req, res, next) => {
  const { body } = req;
  const result = await checkTermsValid(loginUserService)(body, next);
  res.json(result);
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
