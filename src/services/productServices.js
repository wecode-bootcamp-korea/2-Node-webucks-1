import { findManyCategories } from '../models/caegoryDAO';
import {
  createLike,
  deleteLike,
  findManyProducts,
  findOneProduct,
} from '../models/productDAO';

export const getCategoriesService = async () => {
  return findManyCategories();
};

export const getProductsService = async () => {
  return findManyProducts();
};

export const getProductService = async (req, next) => {
  return findOneProduct(req, next);
};

export const createLikeService = async (req, res, next) => {
  return createLike(req, res, next);
};

export const deleteLikeService = async (req, res, next) => {
  return deleteLike(req, res, next);
};
