import { getProduct } from '../services/productServices';

export const getProduct = async (req, res) => {
  const product = await productService.getProduct();
  res.json(product);
};

const getProductInfo = async (req, res) => {
  const id = req.params.id;

  const product = await productService.getProductInfo(id);

  res.json(product);
};

export default { getProduct, getProductInfo };
