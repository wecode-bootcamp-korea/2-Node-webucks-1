import jwt from 'jsonwebtoken';
import { wrapAsync } from '../utils';
import { userModel } from '../models';
const SECRET_KEY = process.env.SECRET_KEY;

const decodeToken = async (req, res, next) => {
  const token = req.cookies.user;
  console.log(token);
  if (!token) throwError('USER_IS_NOT_EXIST', 404);
  const decoded = jwt.verify(token, SECRET_KEY);
  console.log(decoded);
  const user = await userModel.findUserByEmail(decoded.email);
  console.log(user);
  if (!user) throwError('INVALID_USER', 401);
  req.decodedUser = user;
  next();
};

export { decodeToken };
