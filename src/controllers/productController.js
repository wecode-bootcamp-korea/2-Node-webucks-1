import { productService } from '../services';

const getProduct = async (req, res) => {
  const products = await productService.getProduct();

  res.json(products);
};

const getProductOne = async (req, res) => {
  const id = req.params.id;

  const product = await productService.getProductOne(id);

  res.json(product);
};

export default { getProduct, getProductOne };
