import { categoryServices } from '../services';

const getCategory = async (req, res) => {
  try {
    const category = await categoryServices.getCategory();
    res.status(200).json({
      message: 'SUCCESS',
      category,
    });
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryServices.createCategory(name);
    res.status(201).json({
      message: 'CREATED',
      newCategory,
    });
  } catch (err) {
    console.log(err);
  }
};

export default { getCategory, createCategory };
