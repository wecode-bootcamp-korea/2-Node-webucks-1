import { userDao } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getUsers = async () => {
  const users = await userDao.getUsers();
  return users;
};

const creatUser = async bodyObj => {
  const { email, password } = bodyObj;
  const [userInfo] = await userDao.checkUserInfoByEmail(email);
  // console.log(userInfo);

  if (userInfo !== undefined) {
    const err = new Error();
    err.statusCode = 401;
    err.message = '등록된 이메일 입니다. 다른 이메일을 등록해주십시오.';

    throw err;
  } else {
    bodyObj.password = await bcrypt.hash(password, 10);
    // return { message : '회원가입에 성공하셨습니다.'}
  }
  const user = await userDao.creatUser(bodyObj);
  return user;
};

const loginUser = async (email, password) => {
  const [userInfo] = await userDao.checkUserInfoByEmail(email);

  if (!userInfo) {
    const err = new Error();
    err.statusCode = 401;
    err.message = '유효하지 않은 이메일입니다.';

    throw err;
  }

  const isValidUser = await bcrypt.compare(password, userInfo.password);
  console.log(userInfo);
  console.log(isValidUser);

  if (isValidUser) {
    const { id } = userInfo;
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    
    return { message: '로그인에 성공하였습니다.', token };
  } else {
    const err = new Error();
    err.statusCode = 401;
    err.message = '비밀번호가 일치하지 않습니다.';

    throw err;
  }
};

export default { getUsers, creatUser, loginUser };
