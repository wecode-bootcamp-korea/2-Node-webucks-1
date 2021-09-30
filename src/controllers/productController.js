import productService from '../services/productService';

const addProduct = async (req, res) => {
  try {
    const { categoryId, koreanName, englishName } = req.body;
    const allProducts = await productService.addProduct(
      categoryId,
      koreanName,
      englishName
    );
    return res.json({ allProducts });
  } catch (err) {
    console.log(err);
  }
};

export default { addProduct };
