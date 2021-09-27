//jwt 검증
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { secret } = process.env;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.cookie;
  if (!token) {
    return res.status(401).json({
      message: 'NOT LOGGED IN',
    });
  }
  try {
    const decoded = jwt.verify(token.split('=')[1], secret);
    req.decoded = decoded;
  } catch (err) {
    return res.status(401).json({
      message: 'NOT VALID TOKEN',
    });
  }
  return next();
};

export default authMiddleware;
