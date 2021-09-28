import { categoryDao } from '../models';

const getCategory = async () => {
  return await categoryDao.getCategory();
};

const createCategory = async name => {
  return await categoryDao.createCategory(name);
};

export default { getCategory, createCategory };
