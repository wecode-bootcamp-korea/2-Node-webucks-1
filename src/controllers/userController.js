import {
  hardDeleteService,
  softDeleteService,
  joinService,
  loginService,
} from '../services/userService';
import { checkTermsValid, resResultHandler } from '../utils';

export const join = async (req, res, next) => {
  const { body } = req;
  const joinResult = await checkTermsValid(joinService)(body, next);
  const resResult = (result, code) => res.status(code || 201).json(result);
  resResultHandler(resResult)(joinResult, 401);
};

export const login = async (req, res, next) => {
  const { body } = req;
  const result = await checkTermsValid(loginService)(body, next);
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
