import e from 'express';
import { joinService, loginService } from '../services/userService';
import { isValid } from '../utils';

export const joinController = async (req, res, next) => {
  const {
    body: { email, password, passwordConfirm },
  } = req;

  if (!(isValid(email, password) && password === passwordConfirm)) {
    return res.status(400).json({
      ok: false,
      error: '형식에 맞는 이메일과 비밀번호를 입력하세요.',
    });
  }

  const result = await joinService(req, res, next);
  res.json(result);
  return;
};

export const loginControllser = async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  if (!isValid(email, password)) {
    return res.status(400).json({
      ok: false,
      error: '형식에 맞는 이메일과 비밀번호를 입력하세요.',
    });
  }

  const result = await loginService(req, res, next);
  res.json(result);
  return;
};
