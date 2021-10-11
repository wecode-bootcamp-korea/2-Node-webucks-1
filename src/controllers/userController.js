import { userService } from '../services';
import { throwError, wrapAsync } from '../utils';

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

  // const { username, password } = req.body;
  // const userData = { username: 'id1', password: 'pw1' };
  // if (userData.username === username && userData.password === password) {
  //   res.json({ message: 'correct user' });
  // } else res.json({ message: 'INVALID_USER' });

  // const {
  //   realName,
  //   username,
  //   password,
  //   passwordConfirm,
  //   email,
  //   phoneNumber,
  //   isAgreedServicePolicy,
  //   isAgreedCollectPrivate,
  //   isAgreedPhoneMarketing,
  //   isAgreedEmailMarketing,
  // } = req.body;
  // console.log(
  //   realName,
  //   username,
  //   password,
  //   passwordConfirm,
  //   email,
  //   phoneNumber,
  //   isAgreedServicePolicy,
  //   isAgreedCollectPrivate,
  //   isAgreedPhoneMarketing,
  //   isAgreedEmailMarketing
  // );
  // res.json({ message: '성공' });
});

const makeUser = wrapAsync(async (req, res) => {
  const userSignupData = req.body;
  const user = await userService.makeUser(userSignupData);
  res.status(201).json(user);
});

const updateProductLike = wrapAsync(async (req, res) => {
  const { productId } = req.body;
  const { decodedUser } = req;
  // const token = req.cookies.user;
  if (!productId) throwError('PRODUCT_IS_NOT_EXIST', 404);
  // if (!token) throwError('USER_IS_NOT_EXIST', 404);
  // const like = await userService.updateProductLike(token, productId);
  const like = await userService.updateProductLike(decodedUser, productId);
  res.json(like);
});

export default { getUser, makeUser, login, updateProductLike };
