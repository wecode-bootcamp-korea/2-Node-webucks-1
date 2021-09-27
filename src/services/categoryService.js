import { categoryDao } from '../models';

const getCategory = async () => {
  const categories = await categoryDao.getCategory();

  return categories;
};

export default { getCategory };
