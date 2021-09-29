import { categoryService } from '../services';

const getCategory = async (req, res) => {
  const category = await categoryService.getCategory();
  res.json(category);
};

const makeCategory = async (req, res) => {
  const category = await categoryService.makeCategory();
  res.json(category);
};

export default { getCategory, makeCategory };
