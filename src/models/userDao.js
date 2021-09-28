import prisma from '../../prisma';

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
  return user;
};

const createUser = async (email, hash, username, address, phone_number) => {
  const [isCreatedUser] =
    await prisma.$queryRaw`SELECT EXISTS(SELECT * FROM users where email=${email});`;
  const createdUser = isCreatedUser[Object.keys(isCreatedUser)[0]];
  if (createdUser === 0) {
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
