import { productDao } from '../models/productDao';

const allProducts = async categoryId => {
  return await productDao.allProducts(categoryId);
};

export default { allProducts };
