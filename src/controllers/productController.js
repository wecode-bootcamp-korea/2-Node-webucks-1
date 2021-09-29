import productService from '../services/productService';

const allProducts = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;
    const products = await productService.allProducts(Number(categoryId));
    res.status(200).json({
      message: 'SUCCESS',
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

export default { allProducts };
