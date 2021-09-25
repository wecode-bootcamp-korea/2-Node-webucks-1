//jwt 검증
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { secret } = process.env;

const authMiddleware = (req, res, next) => {};

module.exports = authMiddleware;
