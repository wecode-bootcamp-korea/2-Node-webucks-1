import { userService } from '../services';

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(201).json({
      message: 'SUCCESS',
      users,
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    if (!token) {
      res.status(401).json('PLEASE_CHECK_EMAIL_OR_PASSWORD');
    } else {
      res.cookie('user', token, {
        httpOnly: true,
      });
      return res.status(200).json({
        message: 'SUCCESS',
        token,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    if (!newUser) {
      res.status(400).json({
        message: 'USER_ALREADY_EXIST',
      });
    } else {
      res.status(201).json({
        message: 'CREATED',
        newUser,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.decoded.id;
    await userService.deleteUser(userId);
    res.clearCookie('user');
    res.status(200).json({
      message: 'DELETED',
    });
  } catch (err) {
    console.log(err);
  }
};

export default { getUsers, loginUser, createUser, deleteUser };
