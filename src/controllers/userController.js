import { userService } from '../services';

const getUser = async (req, res) => {
  try {
    const users = await userService.getUser();
    res.status(201).json({
      message: 'SUCCESS',
      data: users,
    });
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, username, address, phone_number } = req.body;
    await userService.createUser(
      email,
      password,
      username,
      address,
      phone_number
    );
    res.status(201).json({
      message: 'CREATED',
    });
  } catch (err) {
    console.log(err);
  }
};

export default { getUser, createUser };
