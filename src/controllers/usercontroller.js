import { userService } from '../services';

export const getUser = async (req, res) => {
  const users = await userService.getUser();
  res.json(users);
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.logInUser(email, password);
    const token = await userService.createToken(user);
    res.cookie('user', token);
    res.json(user);
  } catch (error) {
    res.status(401).message('Unauthorized');
  }
};

const setUser = async (req, res) => {
  try {
    const { email, password, username, address, phoneNumber, policyAgreed } =
      req.body;
    const setUserData = await userService.setUser(
      email,
      password,
      username,
      address,
      phoneNumber,
      policyAgreed
    );
    res.status(201).json({ message: setUserData });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: `${err.message}`,
    });
  }
};

export default { getUser, logInUser, setUser };
