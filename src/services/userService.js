import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userModel } from '../models';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const getUser = async () => {
  const users = await userModel.getUser();
  return users;
};

const login = async (email, password) => {
  const user = await userModel.login(email);
  const result = await bcrypt.compare(password, user[0].password);

  if (result) {
    return user;
  } else throw new error('invalid user');
};

const createToken = async user => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    SECRET_KEY
  );
  return token;
};

const setUser = async (
  email,
  password,
  username,
  address,
  phoneNumber,
  policyAgreed
) => {
  const encryptedPw = await bcrypt.hash(password, 10);

  const user = await userModel.setUser(
    email,
    encryptedPw,
    username,
    address,
    phoneNumber,
    policyAgreed
  );
  return user;
};

export default { getUser, setUser, login, createToken };
