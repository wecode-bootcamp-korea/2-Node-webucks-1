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
import { addAmILike, changeKeyName, isItemExist } from '../utils';

export const getCategoriesService = async () => {
  return findManyCategories();
};

const changeKeyNameAndPagnation = data => {
  changeKeyName(data, 'src', 'image');
  changeKeyName(data, 'key', 'categoryId');
};

export const getProductsService = async (offset, userId) => {
  if (userId) {
    const isAuth = await auth(userId);

    if (isAuth.ok) {
      let data = (await authFindManyProducts(offset)) || [];
      data = addAmILike(data, userId);
      changeKeyNameAndPagnation(data);
      return data;
    }
  }

  const data = (await unAuthFindManyProducts(offset)) || [];
  changeKeyNameAndPagnation(data);
  return data;
};

export const getProductService = async (id, userId, next) => {
  const data = await findOneProduct(id, next);
  console.log(data);
  const datas = {
    size: {},
    image: {},
    allergies: [],
    nutrients1: [],
    nutrients2: [],
    nutrients3: [],
  };

  for (let item of data) {
    if (item.allergy && !datas.allergies.includes(item.allergy)) {
      datas.allergies.push(item.allergy);
    }

    if (Number(item.amount)) {
      const isNutrient1Exist = !!datas.nutrients1.find(
        jtem => jtem.nutrient === item.nutrient
      );

      const isNutrient2Exist = !!datas.nutrients2.find(
        jtem => jtem.nutrient === item.nutrient
      );

      const isNutrient3Exist = !!datas.nutrients3.find(
        jtem => jtem.nutrient === item.nutrient
      );

      if (!isNutrient1Exist && !isNutrient2Exist && !isNutrient3Exist) {
        const nutrient = { nutrient: item.nutrient, amount: item.amount };

        if (datas.nutrients1.length < 2) {
          datas.nutrients1.push(nutrient);
        } else if (datas.nutrients2.length < 2) {
          datas.nutrients2.push(nutrient);
        } else {
          datas.nutrients3.push(nutrient);
        }
      }
    }
    datas.size.size = item.name;
    datas.size.amount = item.size;
    datas.image.url = item.src;
  }

  for (let key in datas) {
    if (isItemExist(datas[key])) {
      if (Object.keys(datas[key]).length) {
        data[0][key] = datas[key];
      }
    }
  }

  delete data[0].name;
  delete data[0].amount;
  delete data[0].src;
  delete data[0].allergy;
  delete data[0].nutrient;

  if (userId) {
    const isAuth = await auth(userId, next);
    if (isAuth.ok) {
      const isLikeExist = await findLikeByIds(userId, data[0].id, next);
      data[0].isLike = !!isLikeExist.length;
    }
  }
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
