import { userService } from '../services';

const getUser = async (req, res) => {
  const users = await userService.getUser();
  res.json(users);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    const token = await userService.createToken(user);
    res.cookie('user', token);
    res.json(user);
  } catch (error) {
    res.status(500).send('invalid user');
  }
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

const updateProductLike = async (req, res) => {
  const { productId } = req.body;
  const token = req.cookies.user;
  const like = await userService.updateProductLike(token, productId);
  res.json(like);
};

export default { getUser, setUser, login, updateProductLike };
