import userModel from '../models/userModel';

const getUser = async () => {
  const users = await userModel.getUser();

  return users;
};

const setUser = async (
  email,
  password,
  username,
  address,
  phoneNumber,
  policyAgreed
) => {
  const user = await userModel.setUser(
    email,
    password,
    username,
    address,
    phoneNumber,
    policyAgreed
  );

  return user;
};

export default { getUser, setUser };
