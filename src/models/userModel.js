import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

const getUser = async () => {
  const users = await prisma.$queryRaw`
  SELECT *
  FROM users;
  `;
  return users;
};

const findUserByEmail = async email => {
  const [user] = await prisma.$queryRaw`
    SELECT * from users
    WHERE email=${email};
  `;
  return user;
};

const makeUser = async (
  email,
  password,
  username,
  address,
  phoneNumber,
  policyAgreed
) => {
  await prisma.$queryRaw`
  INSERT INTO users (email,password,username,address,phone_number,policy_agreed)
  VALUES (${email},${password},${username},${address},${phoneNumber},${policyAgreed});
  `;

  const user = await prisma.$queryRaw`
  SELECT *
  FROM users
  ORDER BY id DESC
  LIMIT 6;
  `;
  return user;
};

const getLike = async (userId, productId) => {
  const [like] = await prisma.$queryRaw`
    SELECT *
    FROM likes
    WHERE user_id =${userId} and product_id = ${productId};
  `;
  return like;
};

const likeProduct = async (userId, productId) => {
  await prisma.$queryRaw`
    INSERT INTO likes (user_id,product_id)
    VALUES (${userId},${productId});
  `;

  const [likeCount] = await prisma.$queryRaw`
    SELECT *
    FROM likes
    ORDER BY id DESC
    LIMIT 1;
  `;
  return likeCount;
};

const unlikeProduct = async (userId, productId) => {
  const [likeObj] = await prisma.$queryRaw`
  SELECT *
  FROM likes
  WHERE user_id =${userId} and product_id = ${productId};
`;
  await prisma.$queryRaw`
  DELETE FROM likes 
  WHERE user_id =${userId} and product_id = ${productId};
  `;
  return likeObj;
};

export default {
  getUser,
  makeUser,
  findUserByEmail,
  likeProduct,
  unlikeProduct,
  getLike,
};
