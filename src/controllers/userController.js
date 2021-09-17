import userService from '../services/userService';

const getUser = async (req, res) => {
  const users = await userService.getUser();
  res.json(users);
};

const setUsers = async (req, res) => {
  const user = await userService.setUsers();
  res.json(user);
};

export default { getUser, setUsers };
