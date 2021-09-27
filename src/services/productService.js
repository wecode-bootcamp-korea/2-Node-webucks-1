import { productDao } from '../models';

const getProduct = async () => {
  const products = await productDao.getProduct();
  return products;
};

const getProductOne = async drinkId => {
  const product = await productDao.getProductOne(drinkId);
  return product;
};

export default { getProduct, getProductOne };
