import {
  createLikeService,
  getCategoriesService,
  getProductService,
  getProductsService,
  deleteLikeService,
} from '../services/productServices';

export const getCategories = async (req, res) => {
  const data = await getCategoriesService();
  res.json(data);
  return;
};

export const getProducts = async (req, res) => {
  const {
    locals: { user },
  } = res;

  const {
    query: { offset },
  } = req;

  const data = await getProductsService(offset, user?.userId);
  res.json(data);
  return;
};

export const getProduct = async (req, res, next) => {
  const {
    locals: { user },
  } = res;

  const {
    params: { id },
  } = req;

  const data = await getProductService(id, user?.userId, next);
  res.json(data);
  return;
};

export const createLike = async (req, res, next) => {
  const {
    locals: { user },
  } = res;

  const {
    params: { id: coffeeId },
  } = req;

  const data = await createLikeService(user?.userId, coffeeId, next);
  res.json(data);
  return;
};

export const deleteLike = async (req, res, next) => {
  const {
    locals: { user },
  } = res;

  const {
    params: { id: coffeeId },
  } = req;

  const data = await deleteLikeService(user?.userId, coffeeId, next);
  res.json(data);
  return;
};
