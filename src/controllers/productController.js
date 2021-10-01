import { productService } from '../services';

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();

  res.json(products);
};

const getProduct = async (req, res) => {
  const id = req.params.id;

  const product = await productService.getProduct(id);

  res.json(product);
};

export default { getAllProducts, getProduct };
