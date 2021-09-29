import { productService } from '../services';

const getProduct = async (req, res) => {
  const product = await productService.getProduct();
  res.json(product);
};

const getProductOne = async (req, res) => {
  const id = req.params.id;

  const product = await productService.getProductOne(id);

  res.json(product);
};

export default { getProduct, getProductOne };
