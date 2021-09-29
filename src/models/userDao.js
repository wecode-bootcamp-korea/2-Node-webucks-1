import prisma from '../../prisma';

const createUser = async (email, password, username, address, phone_number) => {
  await prisma.$queryRaw`
    INSERT INTO users (email, password, username, address, phone_number)
    VALUES (${email}, ${password}, ${username}, ${address}, ${phone_number});
  `;

  const [user] = await prisma.$queryRaw`
    SELECT *
    FROM users
    ORDER BY id DESC
    LIMIT 1;
  `;

  return user;
};

export default { createUser };
