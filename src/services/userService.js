import { userDao } from '../models';

const getUser = async () => {
  return await userDao.getUser();
};

const createUser = async (email, password, username, address, phone_number) => {
  return await userDao.createUser(
    email,
    password,
    username,
    address,
    phone_number
  );
};

export default { getUser, createUser };
