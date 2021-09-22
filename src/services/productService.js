import productModel from '../models/productModel';

const getProduct = async () => {
  const product = await productModel.getProduct();
  return product;
};

const getProductInfo = async productId => {
  const product = await productModel.getProductInfo(productId);

  return product;
};

export default { getProductInfo, getProduct };
