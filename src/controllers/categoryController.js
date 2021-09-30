import { categoryServices } from '../services';
import { wrapAsync } from '../utils';

const getCategory = wrapAsync(async (req, res) => {
  const category = await categoryServices.getCategory();
  res.status(200).json({
    message: 'SUCCESS',
    category,
  });
});

const createCategory = wrapAsync(async (req, res) => {
  const { name } = req.body;
  const newCategory = await categoryServices.createCategory(name);
  res.status(201).json({
    message: 'CREATED',
    newCategory,
  });
});

export default { getCategory, createCategory };
