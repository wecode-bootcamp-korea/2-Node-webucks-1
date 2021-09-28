import { productDao } from '../models';

const getProducts = async () => {
  return await productDao.getProducts();
};

const getProduct = async productId => {
  return await productDao.getProduct(productId);
};

const likeProduct = async (productId, userId) => {
  return await productDao.likeProduct(productId, userId);
};

const commentProduct = async (productId, userId, comment) => {
  return await productDao.commentProduct(productId, userId, comment);
};

const updateCommentProduct = async (productId, userId, comment) => {
  return await productDao.updateCommentProduct(productId, userId, comment);
};

const deleteCommentProduct = async (productId, userId) => {
  return await productDao.deleteCommentProduct(productId, userId);
};

export default {
  getProduct,
  getProducts,
  likeProduct,
  commentProduct,
  updateCommentProduct,
  deleteCommentProduct,
};
