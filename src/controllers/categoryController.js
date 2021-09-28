import { categoryServices } from '../services';

const getCategory = async (req, res) => {
  const category = await categoryServices.getCategory();
  res.status(200).json({
    message: 'SUCCESS',
    data: category,
  });
};

const setCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await categoryServices.setCategory(name);
    res.status(201).json({
      message: 'CREATED',
    });
  } catch (err) {
    console.log(err);
  }
};

export default { getCategory, setCategory };
