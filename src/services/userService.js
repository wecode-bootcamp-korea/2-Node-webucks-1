import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models';
import { productModel } from '../models';

const SECRET_KEY = process.env.SECRET_KEY;

const getUser = async () => {
  const users = await userModel.getUser();
  return users;
};

const login = async userLoginData => {
  const user = await userModel.findUserByEmail(userLoginData.email);
  const result = await bcrypt.compare(userLoginData.password, user.password);

  if (result) {
    return user;
  } else throw new Error('INVALID USER');
};

const createToken = async user => {
  const token = jwt.sign({ email: user.email }, SECRET_KEY);
  return token;
};

const makeUser = async userSignupData => {
  const joinedUser = await userModel.findUserByEmail(userSignupData.email);
  if (joinedUser) throw new Error('ALREADY EXIST USER ');

  const encryptedPw = await bcrypt.hash(userSignupData.password, 10);
  userSignupData.password = encryptedPw;
  const user = await userModel.makeUser(userSignupData);
  return user;
};

const updateProductLike = async (token, productId) => {
  const decoded = jwt.verify(token, SECRET_KEY);
  const user = await userModel.findUserByEmail(decoded.email);
  const like = await userModel.getLike(user.id, productId);
  const product = await productModel.getProduct(productId);

  if (!user) throw new Error('INVALID USER');
  if (!product) throw new Error('INVALID PRODUCT');

  if (like) {
    return await userModel.unlikeProduct(user.id, productId);
  } else {
    return await userModel.likeProduct(user.id, productId);
  }
};

export default { getUser, makeUser, login, createToken, updateProductLike };
