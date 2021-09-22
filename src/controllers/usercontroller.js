import { getUser } from '../services/userServices';

export const getUser = async (req, res) => {
  const user = await user.getUser();
  res.json(user);
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
