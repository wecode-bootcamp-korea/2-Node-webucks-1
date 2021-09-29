import { userModel } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;
const getUser = async () => {
  const users = await userModel.getUser();

  return users;
};

const logInUser = async userData => {
  
  const user = await userModel.logInUser(email);
  const login = await bcrypt.compare(userData.password, user.password);

  if (login) {
    return user;
  } else {
    return error;
  }
};

const createToken = async user => {
  const token = jwt.sign({ email: user.email }, SECRET);

  return token;
};
// console(createToken());
const setUser = async setUserData => {
  const encryptedPw = await bcrypt.hash(setUserData.password, 10);
  setUserData.password = encryptedPw;

  const user = await userModel.setUser(setUserData);

  return user;
};

export default { getUser, logInUser, createToken, setUser };
