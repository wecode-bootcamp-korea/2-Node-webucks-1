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

const createUser = async (email, password, username, address, phone_number) => {
  return await prisma.$queryRaw`
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
        ${password},
        ${username},
        ${address},
        ${phone_number}
      );
  `;
};

export default { getUser, createUser };
