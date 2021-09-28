import { userDao } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { secret } = process.env;

const getUser = async () => {
  return await userDao.getUser();
};

const logInUser = async (email, password) => {
  const user = await userDao.logInUser(email, password);
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });
      return token;
    }
  }
};

const createUser = async (email, password, username, address, phone_number) => {
  const hash = await bcrypt.hash(password, 10);
  return await userDao.createUser(email, hash, username, address, phone_number);
};

const checkUser = async () => {
  return await userDao.checkUser();
};

export default { getUser, logInUser, createUser, checkUser };
