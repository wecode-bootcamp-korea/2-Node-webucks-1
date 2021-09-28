import { userDao } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { secret } = process.env;

const getUsers = async () => {
  return await userDao.getUsers();
};

const findUser = async id => {
  const isCreatedUser = await userDao.findUser(id);
  const foundUser = isCreatedUser[Object.keys(isCreatedUser)[0]];
  return foundUser;
};

const loginUser = async (email, password) => {
  const user = await userDao.loginUser(email);
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });
      return token;
    }
  }
};

const createUser = async userData => {
  const { password } = userData;
  const hash = await bcrypt.hash(password, 10);
  return await userDao.createUser(userData, hash);
};

const deleteUser = async userId => {
  return await userDao.deleteUser(userId);
};

export default {
  getUsers,
  loginUser,
  createUser,
  findUser,
  deleteUser,
};
