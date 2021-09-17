import { findManyCategories } from '../models/categoryModel';
import { findManyProducts, findOneProduct } from '../models/productModel';

export const getCategoriesService = async () => {
  return findManyCategories();
};

export const getProductsService = async () => {
  return findManyProducts();
};

export const getProductService = async (req, next) => {
  return findOneProduct(req, next);
};

export const likeService = async (req, res, next) => {};
