import { productDao } from '../models';

const getProduct = async () => {
  const product = await productDao.getProduct();
  return product;
};

const getProductOne = async productId => {
  const product = await productDao.getProductOne(productId);
  return product;
};

const likeProduct = async (productId, userId) => {
  const product = await productDao.likeProduct(productId, userId);
  return product;
};

export default { getProductOne, getProduct, likeProduct };
