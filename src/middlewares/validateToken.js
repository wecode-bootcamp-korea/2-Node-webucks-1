import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userService } from '../services';

dotenv.config();
const { secret } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.cookie;
    if (!token) {
      return res.status(401).json({
        message: 'NOT_LOGGED_IN',
      });
    }
    const decoded = jwt.verify(token.split('=')[1], secret);
    const id = decoded.id;
    const foundUser = await userService.findUserById(id);
    if (foundUser === 0) {
      return res.status(401).json({
        message: 'USER_NOT_FOUND',
      });
    }

    req.decoded = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default validateToken;
