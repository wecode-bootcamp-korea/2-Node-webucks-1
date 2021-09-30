import { userDao } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { secret } = process.env;

const getUsers = async () => {
  return await userDao.getUsers();
};

const findUserById = async id => {
  const isCreatedUser = await userDao.findUserById(id);
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
  const { email, password } = userData;
  const foundUser = await userDao.findUserByEmail(email);
  if (foundUser) {
    const err = new Error('ALREADY_EXISTED_USER');
    err.status = 401;
    throw err;
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await userDao.createUser(userData, hash);
  return newUser;
};

const deleteUser = async userId => {
  return await userDao.deleteUser(userId);
};

export default {
  getUsers,
  loginUser,
  createUser,
  findUserById,
  deleteUser,
};
