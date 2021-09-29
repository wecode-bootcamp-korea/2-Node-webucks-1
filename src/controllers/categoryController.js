import { categoryService } from '../services';

const getCategory = async (req, res) => {
  const category = await categoryService.getCategory();
  res.json(category);
};

const setCategory = async (req, res) => {
  const category = await categoryService.setCategory();
  res.json(category);
  // try {
  //   const { name } = await categoryService.setCategory(name);
  //   res.status(201).json({
  //     message: 'CREATED',
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};

export default { getCategory, setCategory };
