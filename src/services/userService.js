import { userDao } from '../models';

const getUser = async () => {
  return await userDao.getUser();
};

const logInUser = async (email, password) => {
  return await userDao.logInUser(email, password);
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

const checkUser = async () => {
  return await userDao.checkUser();
};

export default { getUser, logInUser, createUser, checkUser };
