import prisma from '../../prisma';

const getUsers = async () => {
  const users = await prisma.$queryRaw`
    SELECT
      email, 
      username, 
      address, 
      phone_number
    FROM
      users;
  `;
  return users;
};

const findUser = async id => {
  const [isCreatedUser] = await prisma.$queryRaw`
      SELECT EXISTS(SELECT * FROM users where id=${id})
    ;`;
  return isCreatedUser;
};

const loginUser = async email => {
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

const createUser = async (userData, hash, next) => {
  try {
    const { email, username, address, phone_number } = userData;
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
  } catch (err) {
    next(err);
  }
};

const deleteUser = async userId => {
  return await prisma.$queryRaw`
    UPDATE users
    SET 
      deleted_at=now(), 
      is_deleted=true 
    WHERE 
      id=${userId}
    ;`;
};

export default {
  getUsers,
  loginUser,
  createUser,
  findUser,
  deleteUser,
};