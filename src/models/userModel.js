import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

const getUser = async () => {
  const users = await prisma.$queryRaw`
  SELECT *
  FROM users;`;

  return users;
};

const setUser = async (
  email,
  password,
  username,
  address,
  phoneNumber,
  policyAgreed
) => {
  await prisma.$queryRaw`INSERT INTO users
  (email, password, username, address, phone_number, policy_agreed)
  VALUES
  (${email}, ${password}, ${username}, ${address}, ${phoneNumber}, ${policyAgreed});`;

  const user = await prisma.$queryRaw`
  SELECT *
  FROM users
  ORDER BY id DESC
  LIMIT 6;`;

  return user;
};

export default { getUser, setUser };
