import bcrypt from 'bcrypt';
import { userModel } from '../models';

const getUser = async () => {
  const users = await userModel.getUser();
  return users;
};

const login = async (email, password) => {
  const user = await userModel.login(email);
  const result = await bcrypt.compare(password, user[0].password);

  if (result) {
    return user;
  } else throw new error('invalid user');
};

const setUser = async (
  email,
  password,
  username,
  address,
  phoneNumber,
  policyAgreed
) => {
  const encryptedPw = await bcrypt.hash(password, 10);

  const user = await userModel.setUser(
    email,
    encryptedPw,
    username,
    address,
    phoneNumber,
    policyAgreed
  );
  return user;
};

export default { getUser, setUser, login };
