import { productModel } from '../models';

const getProducts = async () => {
  const products = await productModel.getProducts();
  return products;
};

const getProduct = async productId => {
  const product = await productModel.getProduct(productId);
  return product;
};

export default { getProducts, getProduct };
