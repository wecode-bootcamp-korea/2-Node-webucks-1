import { findManyCategories } from '../models/categoryModel';
import { findManyProducts, findOneProduct } from '../models/productModel';

export const getCategoriesService = async () => {
  return findManyCategories();
};

export const getProductsService = async () => {
  return findManyProducts();
};

export const getProductService = async (req, res, next) => {
  return findOneProduct(req, res, next);
};
