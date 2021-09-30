import productDao from '../models/productDao';

const addProduct = async (categoryId, koreanName, englishName) => {
  return await productDao.addProduct(categoryId, koreanName, englishName);
};

export default { addProduct };
