import { categoryService } from '../services';

const getCategory = async (req, res) => {
  const categories = await categoryService.getCategory();
  res.json(categories);
};

export default { getCategory };
