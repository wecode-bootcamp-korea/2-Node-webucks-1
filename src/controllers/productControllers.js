import { ERRORS } from '../constances';
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

export const getProducts = async (req, res, next) => {
  const {
    locals: { userId },
  } = res;

  const {
    query: { offset },
  } = req;

  const data = await getProductsService(offset, userId);
  res.json(data);
  return;
};

export const getProduct = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  if (id === undefined || id === null) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOPARAMS,
    });
    return;
  }

  const data = await getProductService(id, next);
  res.json(data);
  return;
};

export const createLike = async (req, res, next) => {
  const { locals } = res;

  const {
    params: { id: coffeeId },
  } = req;

  if (!locals.userId) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
  }

  if (!coffeeId) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOPARAMS,
    });
  }

  const data = await createLikeService(locals.userId, coffeeId, next);
  res.json(data);
  return;
};

export const deleteLike = async (req, res, next) => {
  const { locals } = res;

  const {
    params: { id: coffeeId },
  } = req;

  if (!locals.userId) {
    res.status(403).json({
      ok: false,
      error: ERRORS.UNAUTH,
    });
  }

  if (!coffeeId) {
    res.status(404).json({
      ok: false,
      error: ERRORS.NOPARAMS,
    });
  }

  const data = await deleteLikeService(locals.userId, coffeeId, next);
  res.json(data);
  return;
};
