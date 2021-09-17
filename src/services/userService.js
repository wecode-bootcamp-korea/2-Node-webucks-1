import { createUser, findUserByEmail } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const joinService = async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const isExist = await findUserByEmail(next, email);

  if (isExist.length) {
    return {
      ok: false,
      error: '같은 이메일로 가입한 유저가 존재합니다.',
    };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return createUser(req, res, next, hashedPassword);
  } catch (e) {
    next(e);
  }
};

export const loginService = async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const existUser = await findUserByEmail(next, email);
  if (!existUser.length) {
    res.status(400).json({
      ok: false,
      error: '이메일이나 비밀번호가 올바르지 않습니다.',
    });
    return;
  }

  try {
    const isPassCorrect = await bcrypt.compare(password, existUser[0].password);
    if (!isPassCorrect) {
      res.status(400).json({
        ok: false,
        error: '이메일이나 비밀번호가 올바르지 않습니다.',
      });
      return;
    }

    const token = jwt.sign({ id: existUser[0].id }, process.env.SECRET);
    return { ok: true, token };
  } catch (e) {
    next(e);
  }
};
