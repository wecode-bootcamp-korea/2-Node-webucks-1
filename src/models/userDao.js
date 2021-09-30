import prisma from '../../prisma';

const createUser = async userData => {
  const { email, password, username, address, phone_number, policy_agreed } =
    userData;
  await prisma.$queryRaw`
    INSERT INTO users (email, password, username, address, phone_number, policy_agreed)
    VALUES (${email}, ${password}, ${username}, ${address}, ${phone_number}, ${policy_agreed});
    `;
  const [user] = await prisma.$queryRaw`
    SELECT *
    FROM users
    ORDER BY id DESC
    LIMIT 1;
  `;
  return user;
};

const login = async email => {
  return await prisma.$queryRaw`
  SELECT *
  FROM users 
  WHERE email=${email};
    `;
};

export default { createUser, login };
