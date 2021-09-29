import { categoryDao } from '../models/categoryDao';

const createCategory = async name => {
  return await categoryDao.createCategory(name);
};

export default { createCategory };
