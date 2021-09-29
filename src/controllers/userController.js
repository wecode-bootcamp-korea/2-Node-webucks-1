import userService from '../services/userService';

const createUser = async (req, res) => {
  try {
    const { email, password, username, address, phone_number } = req.body;
    const user = await userService.createUser(
      email,
      password,
      username,
      address,
      phone_number
    );
    return res.json({ user });
  } catch (err) {
    console.log(err);
  }
};

export default { createUser };
