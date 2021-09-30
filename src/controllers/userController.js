import { userService } from '../services';
import { wrapAsync } from '../utils';

const getUser = wrapAsync(async (req, res) => {
  const users = await userService.getUser();
  res.json(users);
});

const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const userLoginData = { email, password };

  const user = await userService.login(userLoginData);
  const token = await userService.createToken(user);
  res.cookie('user', token);
  res.json(user);
});

const makeUser = wrapAsync(async (req, res) => {
  const { email, password, username, address, phoneNumber, policyAgreed } =
    req.body;
  const userSignupData = {
    email,
    password,
    username,
    address,
    phoneNumber,
    policyAgreed,
  };
  const user = await userService.makeUser(userSignupData);
  res.status(201).json(user);
});

const updateProductLike = wrapAsync(async (req, res) => {
  const { productId } = req.body;
  const token = req.cookies.user;
  const like = await userService.updateProductLike(token, productId);
  res.json(like);
});

export default { getUser, makeUser, login, updateProductLike };
