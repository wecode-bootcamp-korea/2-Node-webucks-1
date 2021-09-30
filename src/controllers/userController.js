import userService from '../services/userService';

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    return res.json({ user });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginData = await userService.login(email, password);
    return res.json({ loginData });
  } catch (err) {
    console.log(err);
  }
};
export default { createUser, login };
