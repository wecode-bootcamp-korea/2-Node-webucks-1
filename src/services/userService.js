import userDao from '../models/userDao';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secretkey = process.env.SECRET_KEY;

const createUser = async userData => {
  const { password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;
  return await userDao.createUser(userData);
};

const login = async email => {
  const token = jwt.sign({ id: email }, secretkey);
  const loginData = await userDao.login(email);
  return { loginData, token };
};
export default { createUser, login };
