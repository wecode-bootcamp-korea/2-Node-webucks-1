import userDao from '../models/userDao';

const createUser = async (email, password, username, address, phone_number) => {
  return await userDao.createUser(
    email,
    password,
    username,
    address,
    phone_number
  );
};

export default { createUser };
