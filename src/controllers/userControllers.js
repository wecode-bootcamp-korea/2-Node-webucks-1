import { ERRORS } from '../constances';
import { joinService, loginService } from '../services/userService';
import { isValid } from '../utils';

export const joinController = async (req, res, next) => {
  const {
    body: { email, password, passwordConfirm, nickName },
  } = req;

  if (!isValid(email, password) || password !== passwordConfirm) {
    return res.status(400).json({
      ok: false,
      error: ERRORS.INVALID,
    });
  }

  const result = await joinService(email, password, nickName, next);
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
      error: ERRORS.INVALID,
    });
  }

  const result = await loginService(email, password, next);
  res.json(result);
  return;
};
