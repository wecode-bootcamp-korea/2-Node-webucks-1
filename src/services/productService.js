import { productModel } from '../models';

const getProducts = async () => {
  const products = await productModel.getProducts();
  return products;
};

const getProduct = async productId => {
  const product = await productModel.getProduct(productId);
  return product;
};

const insertComment = async commentInsertData => {
  const comment = await productModel.insertComment(commentInsertData);
  return comment;
};

export default { getProducts, getProduct, insertComment };
