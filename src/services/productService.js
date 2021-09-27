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

const commentProduct = async (productId, userId, comment) => {
  const product = await productDao.commentProduct(productId, userId, comment);
  return product;
};

const updateCommentProduct = async (productId, userId, comment) => {
  const product = await productDao.updateCommentProduct(
    productId,
    userId,
    comment
  );
  return product;
};

const deleteCommentProduct = async (productId, userId) => {
  const product = await productDao.deleteCommentProduct(productId, userId);
  return product;
};

export default {
  getProductOne,
  getProduct,
  likeProduct,
  commentProduct,
  updateCommentProduct,
  deleteCommentProduct,
};
