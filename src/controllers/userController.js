import { joinService } from '../services/userService';
import { emailValid, passwordValid } from '../utils';

export const joinController = async (req, res, next) => {
  const {
    body: { email, password, passwordConfirm },
  } = req;

  if (
    !emailValid(email) ||
    !passwordValid(password) ||
    password !== passwordConfirm
  ) {
    return res.status(400).json({
      ok: false,
      error: '형식에 맞는 이메일과 비밀번호를 입력하세요.',
    });
  }

  const result = await joinService(req, res, next);
  res.json(result);
};
