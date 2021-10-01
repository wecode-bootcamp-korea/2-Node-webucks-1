import { userService } from '../services';

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.json(users);
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: `${err.message}`,
    });
  }
};

const creatUser = async (req, res) => {
  try {
    const user = await userService.creatUser(req.body);
    
    res.status(201).json({ message: user.message });
  } catch (err) {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    console.log(user);

    res.cookie('user', user.token);
    res.status(201).json({ message: user.message });
  } catch (err) {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      message,
    });
  }
};

export default { getUsers, creatUser, loginUser };
