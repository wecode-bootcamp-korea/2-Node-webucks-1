import { ERRORS } from '../constances';
import { findManyCategories } from '../models/caegoryDAO';
import {
  authFindManyProducts,
  createLike,
  deleteLike,
  findLikeByIds,
  findOneProduct,
  findProductById,
  unAuthFindManyProducts,
} from '../models/productDAO';
import { auth, findUserById } from '../models/userDAO';
import {
  addAmILike,
  changeKeyName,
  isItemExist,
  offsetPagnation,
} from '../utils';

export const getCategoriesService = async () => {
  return findManyCategories();
};

export const getProductsService = async (offset, userId) => {
  if (userId) {
    const isAuth = await auth(userId);
    if (isAuth.ok) {
      const data = (await authFindManyProducts()) || [];
      addAmILike(data, userId);
      changeKeyName(data, 'src', 'image');
      changeKeyName(data, 'key', 'categoryId');
      return offsetPagnation(data, 12, offset);
    }
  }

  const data = (await unAuthFindManyProducts()) || [];
  changeKeyName(data, 'src', 'image');
  changeKeyName(data, 'key', 'categoryId');
  return offsetPagnation(data, 12, offset);
};

export const getProductService = async (id, next) => {
  const data = await findOneProduct(id, next);
  if (!data.length) return data;

  const datas = {
    size: {},
    image: {},
    allergies: [],
    nutrients: [],
  };

  for (let item of data) {
    if (item.allergy && !datas.allergies.includes(item.allergy)) {
      datas.allergies.push(item.allergy);
    }

    if (Number(item.amount)) {
      const isExist = !!datas.nutrients.find(
        jtem => jtem.nutrient === item.nutrient
      );

      if (!isExist) {
        const nutrient = { nutrient: item.nutrient, amount: item.amount };
        datas.nutrients.push(nutrient);
      }
    }
    datas.size.size = item.name;
    datas.size.amount = item.size;
    datas.image.url = item.src;
  }

  for (let key in datas) {
    if (isItemExist(datas[key])) {
      data[0][key] = datas[key];
    }
  }

  delete data[0].name;
  delete data[0].amount;
  delete data[0].src;
  delete data[0].allergy;
  delete data[0].nutrient;
  return data[0];
};

export const createLikeService = async (userId, coffeeId, next) => {
  const isUserExist = await findUserById(userId, next);
  if (!isUserExist.length) {
    return {
      ok: false,
      error: ERRORS.UNAUTH,
    };
  }

  const isProductExist = await findProductById(coffeeId, next);

  if (!isProductExist.length) {
    return {
      ok: false,
      error: ERRORS.NOITEM('상품이'),
    };
  }

  const isLikeExist = await findLikeByIds(userId, coffeeId, next);
  if (isLikeExist.length) {
    return {
      ok: false,
      error: ERRORS.DUPLICATE('좋아요를'),
    };
  }

  return createLike(userId, coffeeId, next);
};

export const deleteLikeService = async (userId, coffeeId, next) => {
  const isUserExist = await findUserById(userId, next);
  if (!isUserExist.length) {
    return {
      ok: false,
      error: ERRORS.UNAUTH,
    };
  }

  const isProductExist = await findProductById(coffeeId, next);

  if (!isProductExist.length) {
    return {
      ok: false,
      error: ERRORS.NOITEM('상품이'),
    };
  }

  const isLikeExist = await findLikeByIds(userId, coffeeId, next);
  if (!isLikeExist.length) {
    return {
      ok: false,
      error: ERRORS.WRONGREQ,
    };
  }

  return deleteLike(userId, coffeeId, next);
};
