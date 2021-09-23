import client from '.';
import { isItemExist } from '../utils';
import { findUserById } from './userDAO';

export const findManyProducts = async () => {
  return client.$queryRaw`
  SELECT 
    c.id,
    c.korean_name,
    c.english_name,
    c.description
  FROM coffees c;
  `;
};

export const findOneProduct = async (req, next) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await client.$queryRaw`
    SELECT
      c.id,
      c.korean_name,
      c.english_name,
      c.description,
      s.name,
      s.size,
      i.src,
      a.allergy,
      n.nutrient,
      nc.amount
    FROM coffees c
    LEFT OUTER JOIN sizes s ON c.sizes_id=s.id
    LEFT OUTER JOIN images i ON c.id=i.coffees_id
    LEFT OUTER JOIN allergy_coffee ac ON ac.coffees_id=c.id
    LEFT OUTER JOIN allergies a ON a.id=ac.allergies_id
    LEFT OUTER JOIN nutrition_coffee nc ON nc.coffees_id=c.id
    LEFT OUTER JOIN nutritions n ON n.id=nc.nutritions_id
    WHERE c.id=${id};
    `;

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
  } catch (e) {
    next(e);
  }
};

const findProductById = async (id, next) => {
  try {
    return client.$queryRaw`
    SELECT c.id
    FROM coffees c
    WHERE 
      id=${id};
  `;
  } catch (e) {
    next(e);
  }
};

export const createLike = async (req, res, next) => {
  const { locals } = res;

  const {
    params: { id: coffeeId },
  } = req;

  if (!('userId' in locals)) {
    return {
      ok: false,
      error: '로그인 해야 이용할 수 있는 기능입니다.',
    };
  }
  const userExist = await findUserById(locals.userId, next);
  const { id: userId } = userExist[0];
  if (!userId) {
    return {
      ok: false,
      error: '존재하지 않는 계정입니다.',
    };
  }

  try {
    const isExist = await findProductById(coffeeId, next);

    if (!isExist.length) {
      return {
        ok: false,
        error: '존재하지 않는 상품입니다.',
      };
    }

    await client.$queryRaw`
      INSERT INTO
      coffees_likes(
        users_id,
        coffees_id)
      VALUES(
        ${userId},
        ${coffeeId});
    `;

    return {
      ok: true,
    };
  } catch (e) {
    next(e);
  }
};
export const deleteLike = async (req, res, next) => {
  const { locals } = res;

  const {
    params: { id: coffeeId },
  } = req;

  if (!('userId' in locals)) {
    return {
      ok: false,
      error: '로그인 해야 이용할 수 있는 기능입니다.',
    };
  }
  const userExist = await findUserById(locals.userId, next);
  const { id: userId } = userExist[0];
  if (!userId) {
    return {
      ok: false,
      error: '존재하지 않는 계정입니다.',
    };
  }

  try {
    const isExist = await findProductById(coffeeId, next);

    if (!isExist.length) {
      return {
        ok: false,
        error: '존재하지 않는 상품입니다.',
      };
    }
    await client.$queryRaw`
      DELETE 
      FROM coffees_likes cl
      where
          cl.users_id=${userId}
        AND
          cl.coffees_id=${coffeeId};
    `;

    return {
      ok: true,
    };
  } catch (e) {
    next(e);
  }
};
