import { categoryDao } from '../models';

const getCategory = async () => {
  const category = await categoryDao.getCategory();
  return category;
};

const setCategory = async name => {
  const category = await categoryDao.setCategory(name);
  return category;
};

export default { getCategory, setCategory };
