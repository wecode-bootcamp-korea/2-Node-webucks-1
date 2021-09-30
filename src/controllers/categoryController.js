import categoryService from '../services/categoryService';

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.createCategory(name);
    res.status(201).json({
      message: 'CREATED',
      newCategory,
    });
  } catch (err) {
    console.log(err);
  }
};

export default { createCategory };
