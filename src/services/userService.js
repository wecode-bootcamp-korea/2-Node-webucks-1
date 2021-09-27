import { userDao } from '../models';

const getUser = async () => {
  const users = await userDao.getUser();
  return users;
};

const creatUser = async (email, password, username, address, phone_number) => {
  try {
    const user = await userDao.creatUser(
      email,
      password,
      username,
      address,
      phone_number
    );
    return user;
  } catch (err) {
    throw err;
  }
};

export default { getUser, creatUser };
