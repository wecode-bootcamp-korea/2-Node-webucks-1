import categoryService from '../services/categoryServices';

const getCategory = async (req, res) => {
  const category = await categoryService.getCategory();
  res.json(category);
};

const setCategory = async (req, res) => {
  const category = await categoryService.setCategory();
  res.json(category);
};

export default { getCategory, setCategory };
