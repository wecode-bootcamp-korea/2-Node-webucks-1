import { productDao } from '../models';

const getAllProducts = async () => {
  const products = await productDao.getAllProducts();
  return products;
};

const getProduct = async drinkId => {
  const product = await productDao.getProduct(drinkId);
  return product;
};

export default { getAllProducts, getProduct };
