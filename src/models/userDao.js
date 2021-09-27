import prisma from '../../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { secret } = process.env;

const getUser = async () => {
  const users = await prisma.$queryRaw`
    SELECT
      email, 
      password, 
      username, 
      address, 
      phone_number
    FROM
      users;
  `;
  return users;
};

const logInUser = async (email, password) => {
  const [user] = await prisma.$queryRaw`
    SELECT
      id,
      email, 
      password, 
      username, 
      address, 
      phone_number
    FROM
      users
    WHERE 
    email=${email};
    `;
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });
      return token;
    }
  }
};

const createUser = async (email, password, username, address, phone_number) => {
  const [isCreatedUser] =
    await prisma.$queryRaw`SELECT EXISTS(SELECT * FROM users where email=${email});`;
  const createdUser = isCreatedUser[Object.keys(isCreatedUser)[0]];
  if (createdUser === 0) {
    const hash = await bcrypt.hash(password, 10);
    await prisma.$queryRaw`
    INSERT INTO
      users(
        email, 
        password, 
        username, 
        address, 
        phone_number
      )
      VALUES ( 
        ${email},
        ${hash},
        ${username},
        ${address},
        ${phone_number}
      );
    `;
    const [newUser] = await prisma.$queryRaw`
      SELECT email, username
      FROM users
      WHERE email=${email};
    `;

    return newUser;
  }
};

const checkUser = async () => {
  const users = await prisma.$queryRaw`
    SELECT
      email, 
      password, 
      username, 
      address, 
      phone_number
    FROM
      users;
  `;
  return users;
};

export default { getUser, logInUser, createUser, checkUser };
