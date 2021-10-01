import prisma from '../../prisma';

const getUsers = async () => {
  const users = await prisma.$queryRaw`
  SELECT u.id, u.username, u.email, u.address, u.phone_number, u.policy_agreed
  FROM users u`;

  return users;
};

const creatUser = async bodyObj => {
  const { email, password, username, address, phone_number } = bodyObj;
  await prisma.$queryRaw`
    INSERT INTO users (email, password, username, address, phone_number)
    VALUES (${email}, ${password}, ${username}, ${address}, ${phone_number})`;

  const [user] = await prisma.$queryRaw`
    SELECT *
    FROM users
    ORDER BY id DESC
    LIMIT 1
    `;

  return user;
};

const checkUserInfoByEmail = async email => {
  const userInfo = await prisma.$queryRaw`
    SELECT u.id, u.username, u.password
    FROM users u
    WHERE
    u.email = ${email}`;

  return userInfo;
};


export default { getUsers, creatUser, checkUserInfoByEmail };
