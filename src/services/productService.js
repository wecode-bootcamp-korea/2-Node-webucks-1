import { productModels } from '../models';

const getProduct = async () => {
  const product = await productModels.getProduct();
  return product;
};

const getProductOne = async productId => {
  const product = await productModels.getProductOne(productId);
  return product;
};

export default { getProductOne, getProduct };
