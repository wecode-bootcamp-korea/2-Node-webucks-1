import { ERRORS } from '../constants';
import {
  authFindManyProducts,
  createLike,
  deleteLike,
  findLikeByIds,
  findOneProduct,
  findProductById,
  unAuthFindManyProducts,
} from '../models/productDAO';
import { findManyCategories } from '../models/caegoryDAO';
import { addAmILike, changeKeyName, ifOk, isItemExist } from '../utils';

const changeKeyNames = data => {
  changeKeyName(data, 'src', 'image');
  changeKeyName(data, 'key', 'categoryId');
};

export const getCategoriesService = async () => {
  return findManyCategories();
};

export const getProductsService = async (offset, userId) => {
  if (userId) {
    let data = (await authFindManyProducts(offset)) || [];
    data = addAmILike(data, userId);
    changeKeyNames(data);
    return data;
  }

  const data = (await unAuthFindManyProducts(offset)) || [];
  changeKeyNames(data);
  return data;
};

export const getProductService = async (id, userId, next) => {
  const data = await findOneProduct(id);

  const datas = {
    size: {},
    image: {},
    comment: [],
    allergies: [],
    nutrients1: [],
    nutrients2: [],
    nutrients3: [],
  };

  for (let item of data) {
    if (item.coid && item.description) {
      const isExist = datas.comment.find(jtem => jtem.id === item.coid);
      if (isExist) continue;
      const temp = {
        id: item.coid,
        description: item.description,
        nick_name: item.nick_name || '익명',
        amILike: item.clus === userId,
      };

      datas.comment.push(temp);
    }

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
        const nutrient = {
          nutrient: item.nutrient,
          amount: item.amount,
          id: item.nid,
        };

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

  if (data[0]) {
    delete data[0].name;
    delete data[0].amount;
    delete data[0].src;
    delete data[0].allergy;
    delete data[0].nutrient;
    delete data[0].description;
    delete data[0].coid;
    delete data[0].users_id;
  }

  if (userId) {
    const isLikeExist = await findLikeByIds(userId, data[0].id);
    data[0].isLike = !!isLikeExist.length;
  }

  return data[0];
};

export const createLikeService = async (userId, coffeeId, next) => {
  const product = await findProductById(coffeeId, next);
  let e = { status: 401, message: ERRORS.NOITEM('상품이') };
  ifOk()({ e, isOk: !!product.length, next });

  const like = await findLikeByIds(userId, coffeeId, next);

  e = { status: 401, message: ERRORS.DUPLICATE('좋아요를') };
  ifOk()({ e, isOk: !!like.length, next });

  return createLike(userId, coffeeId);
};

export const deleteLikeService = async (userId, coffeeId, next) => {
  const product = await findProductById(coffeeId, next);
  let e = { status: 403, message: ERRORS.NOITEM('상품이') };
  ifOk()({ isOk: !product.length, next, e });

  const like = await findLikeByIds(userId, coffeeId, next);
  e = { status: 403, message: ERRORS.WRONGREQ };
  ifOk()({ isOk: !like.length, e, next });

  return deleteLike(userId, coffeeId);
};
