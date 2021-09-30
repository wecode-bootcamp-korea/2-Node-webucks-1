import productDao from '../models/productDao';

const allProducts = async categoryId => {
  console.log(productDao);
  return await productDao.allProducts(categoryId);
};

export default { allProducts };
