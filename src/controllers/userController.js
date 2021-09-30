import { userService } from '../services';
import { wrapAsync } from '../utils';

const getUsers = wrapAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.status(201).json({
    message: 'SUCCESS',
    users,
  });
});

const loginUser = wrapAsync(async (req, res) => {
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
});

const createUser = wrapAsync(async (req, res) => {
  const userData = req.body;
  const newUser = await userService.createUser(userData);
  res.status(201).json({
    message: 'CREATED',
    newUser,
  });
});

const deleteUser = wrapAsync(async (req, res) => {
  const userId = req.decoded.id;
  await userService.deleteUser(userId);
  res.clearCookie('user');
  res.status(200).json({
    message: 'DELETED',
  });
});

export default { getUsers, loginUser, createUser, deleteUser };
