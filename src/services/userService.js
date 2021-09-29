import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models';

const SECRET_KEY = process.env.SECRET_KEY;

const getUser = async () => {
  const users = await userModel.getUser();
  return users;
};

const login = async (email, password) => {
  const user = await userModel.findUserByEmail(email);
  const result = await bcrypt.compare(password, user.password);

  if (result) {
    return user;
  } else throw new error('invalid user');
};

const createToken = async user => {
  const token = jwt.sign({ email: user.email }, SECRET_KEY);
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

const updateProductLike = async (token, productId) => {
  const decoded = jwt.verify(token, SECRET_KEY);
  const user = await userModel.findUserByEmail(decoded.email);
  const like = await userModel.getLike(user.id, productId);
  if (like) {
    return await userModel.unlikeProduct(user.id, productId);
  } else {
    return await userModel.likeProduct(user.id, productId);
  }
};

export default { getUser, setUser, login, createToken, updateProductLike };
