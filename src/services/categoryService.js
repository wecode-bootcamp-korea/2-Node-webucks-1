import { categoryModel } from '../models';

const getCategory = async () => {
  const category = await categoryModel.getCategory();
  return category;
};

const setCategory = async () => {
  const category = await categoryModel.setCategory();
  return category;
};

export default { getCategory, setCategory };
