import categoryModels from '../models/categoryModels';

const getCategory = async () => {
  const category = await categoryModels.getCategory();
  return category;
};

const setCategory = async () => {
  const category = await categoryModels.setCategory();

  return category;
};

export default { getCategory, setCategory };
