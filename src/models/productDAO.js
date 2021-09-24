import client from '.';

export const findManyProducts = async () => {
  return client.$queryRaw`
  SELECT 
    c.id,
    c.korean_name,
    c.english_name,
    c.description,
    ct.name
  FROM coffees c
  JOIN categories ct ON ct.id=c.categories_id
  ORDER BY
  ct.id ASC,
  c.korean_name ASC;
  `;
};

export const findOneProduct = async (id, next) => {
  try {
    return client.$queryRaw`
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
  } catch (e) {
    next(e);
  }
};

export const findProductById = async (id, next) => {
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

export const createLike = async (userId, coffeeId, next) => {
  try {
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

export const deleteLike = async (userId, coffeeId, next) => {
  try {
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

export const findLikeByIds = async (userId, coffeeId, next) => {
  try {
    return client.$queryRaw`
    SELECT l.id 
    FROM coffees_likes l
    WHERE
        l.users_id=${userId}
      AND
        l.coffees_id=${coffeeId};
  `;
  } catch (e) {
    next(e);
  }
};
