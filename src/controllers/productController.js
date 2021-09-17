import {
  getCategoriesService,
  getProductService,
  getProductsService,
} from '../services/productServices';

export const getCategories = async (req, res) => {
  const data = await getCategoriesService();
  res.json(data);
};

export const getProducts = async (req, res) => {
  const data = await getProductsService();
  res.json(data);
};

export const getProduct = async (req, res, next) => {
  const data = await getProductService(req, next);
  res.json(data);
};

export const likeController = async (req, res, next) => {};
