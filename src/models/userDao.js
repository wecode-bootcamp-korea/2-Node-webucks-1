import prisma from '../../prisma';

const getUser = async () => {
  const users = await prisma.$queryRaw`
  SELECT u.id, u.username, u.email, u.address, u.phone_number, u.policy_agreed
  FROM users u`;

  return users;
};

const creatUser = async (email, password, username, address, phone_number) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

export default { getUser, creatUser };
