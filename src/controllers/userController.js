import userService from '../services/userService';

const getUser = async (req, res) => {
  const users = await userService.getUser();
  res.json(users);
};

const setUser = async (req, res) => {
  const { email, password, username, address, phoneNumber, policyAgreed } =
    req.body;
  const user = await userService.setUser(
    email,
    password,
    username,
    address,
    phoneNumber,
    policyAgreed
  );
  res.json(user);
};

export default { getUser, setUser };
