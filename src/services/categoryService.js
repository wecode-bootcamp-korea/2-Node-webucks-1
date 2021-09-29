import { categoryModel } from '../models';

const getCategory = async () => {
  const category = await categoryModel.getCategory();
  return category;
};

const makeCategory = async () => {
  const category = await categoryModel.makeCategory();
  return category;
};

export default { getCategory, makeCategory };
