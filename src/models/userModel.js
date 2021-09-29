import prisma from '../client';

const getUser = async () => {
  const users = await prisma.$queryRaw(`
  SELECT 
    *
  FROM 
    users;
  `);
  return users;
};

const logInUser = async (email, password) => {
  const [users] = await prisma.$queryRaw(`
  SELECT
    *
  FROM
    user
  WHERE
    email=${email};
  `);
  return users;
};

const setUser = async userUpdate => {
  const { email, password, username, address, phone_number, policy_agreed } =
    userUpdate;
  await prisma.$queryRaw(`
    INSERT INTO
      users(
        email,
        password,
        username,
        address,
        phone_number,
        policy_agreed
        )
      VALUES (
        ${email},
        ${hash},
        ${username},
        ${address},
        ${phone_number},
        ${policy_agreed}
      );
    `);
  const user = await prisma.$queryRaw(`
      SELECT *
      FROM users
      ORDER BY id DESC;
    `);
  return user;
};
export default { getUser, logInUser, setUser };
