import { productService } from '../services';

const getProducts = async (req, res) => {
  const products = await productService.getProducts();

  res.json(products);
};

const getProduct = async (req, res) => {
  const id = req.params.id;

  const product = await productService.getProduct(id);

  res.json(product);
};

export default { getProducts, getProduct };
