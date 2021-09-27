import { userService } from '../services';

const getUser = async (req, res) => {
  const users = await userService.getUser();

  res.json(users);
};

const creatUser = async (req, res) => {
  try {
    const { email, password, username, address, phone_number } = req.body;
    const user = await userService.creatUser(
      email,
      password,
      username,
      address,
      phone_number
    );

    res.status(201).json({ message: user });

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: `${err.message}`,
    });
  }
};

export default { getUser, creatUser };