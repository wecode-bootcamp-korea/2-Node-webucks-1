import { checkIsExist, createUser } from '../models/userModel';
import bcrypt from 'bcrypt';

export const joinService = async (req, res, next) => {
  const {
    body: { password },
  } = req;

  const isExist = await checkIsExist(req, next);

  if (isExist) {
    return {
      ok: false,
      error: '같은 이메일로 가입한 유저가 존재합니다.',
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return createUser(req, res, hashedPassword);
  } catch (e) {
    res.json({
      ok: false,
      error: '알수없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};
