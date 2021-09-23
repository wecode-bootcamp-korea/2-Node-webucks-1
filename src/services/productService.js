import { productDao } from '../models';

const getProduct = async () => {
  const product = await productDao.getProduct();
  return product;
};

const getProductOne = async productId => {
  const product = await productDao.getProductOne(productId);
  return product;
};

export default { getProductOne, getProduct };
