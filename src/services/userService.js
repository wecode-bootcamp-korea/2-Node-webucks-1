import userModel from '../models/userModel';

const getUser = async () => {
  const users = await userModel.getUser();
  return users;
};

const setUsers = async () => {
  const user = await userModel.setUsers();
  return user;
};

export default { getUser, setUsers };
