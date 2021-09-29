import { productModel } from '../models';

const getProduct = async () => {
  const product = await productModel.getProduct();
  return product;
};

const getProductOne = async productId => {
  const product = await productModel.getProductOne(productId);

  return product;
};

export default { getProductOne, getProduct };
