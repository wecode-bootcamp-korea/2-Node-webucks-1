import { categoryModel } from '../models';

const getCategory = async () => {
  const category = await categoryModel.getCategory();

  return category;
};

const setCategory = async name => {
  const category = await categoryModel.setCategory(name);

  return category;
};

export default { getCategory, setCategory };
