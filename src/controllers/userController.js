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

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.logInUser(email, password);
    if (!token) {
      res.status(401).json('PLEASE CHECK EMAIL OR PASSWORD');
    } else {
      res.cookie('user', token, {
        httpOnly: true,
      });
      return res.status(201).json({
        message: 'LOGIN SUCCEED',
        token,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, username, address, phone_number } = req.body;
    const newUser = await userService.createUser(
      email,
      password,
      username,
      address,
      phone_number
    );
    if (!newUser) {
      res.status(401).json({
        message: 'EMAIL ALREADY EXIST',
      });
    } else {
      res.status(201).json({
        message: 'CREATED',
        user: newUser,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const checkUser = async (req, res) => {
  try {
    const users = await userService.checkUser();
    res.status(201).json({
      message: 'VALID USER',
      data: users,
    });
  } catch (err) {
    console.log(err);
  }
};

export default { getUser, logInUser, createUser, checkUser };
