import client from '.';
import { SUCCESS } from '../constants';

export const authFindManyProducts = async offset => {
  return client.$queryRaw`
  SELECT 
    c.id,
    c.korean_name,
    ct.key,
    i.src,
    cl.users_id
  FROM(
    SELECT 
      c.id
    FROM coffees c
    ORDER BY
      c.id ASC
    LIMIT ${offset}, 20)q
  JOIN coffees c ON c.id=q.id
  JOIN categories ct ON ct.key=c.categories_id
  JOIN images i ON i.coffees_id=c.id
  LEFT OUTER JOIN coffees_likes cl ON cl.coffees_id=c.id
  ORDER BY
    ct.key ASC,
    c.korean_name ASC;
  `;
};

export const unAuthFindManyProducts = async offset => {
  return client.$queryRaw`
  SELECT 
    c.id,
    c.korean_name,
    ct.key,
    i.src
  FROM(
    SELECT 
      c.id
    FROM coffees c
    ORDER BY
      c.id ASC
    LIMIT ${offset}, 20
    )q
  JOIN coffees c ON c.id=q.id
  JOIN categories ct ON ct.key=c.categories_id
  JOIN images i ON i.coffees_id=c.id
  ORDER BY
    ct.key ASC,
    c.korean_name ASC;
  `;
};

export const findOneProduct = async id => {
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
      nc.amount,
      n.id nid,
      co.description,
      co.id coid,
      co.description,
      u.nick_name,
      cls.users_id clus
    FROM coffees c
      JOIN sizes s ON c.sizes_id=s.id
      JOIN images i ON c.id=i.coffees_id
      JOIN nutrition_coffee nc ON nc.coffees_id=c.id
      JOIN nutritions n ON n.id=nc.nutritions_id
      LEFT OUTER JOIN allergy_coffee ac ON ac.coffees_id=c.id
      LEFT OUTER JOIN allergies a ON a.id=ac.allergies_id
      LEFT OUTER JOIN comments co ON co.coffees_id=c.id
      LEFT OUTER JOIN users u ON u.id=co.users_id 
      LEFT OUTER JOIN comments_likes cls ON cls.comments_id=co.id
    WHERE 
      c.id=${id}
    ORDER BY
      co.created_at DESC
    `;
};

export const findProductById = async id => {
  return client.$queryRaw`
    SELECT c.id
    FROM coffees c
    WHERE 
      id=${id};
  `;
};

export const createLike = async (userId, coffeeId) => {
  await client.$queryRaw`
    INSERT INTO
    coffees_likes(
      users_id,
      coffees_id
      )
    VALUES(
      ${userId},
      ${coffeeId}
      );
    `;

  return { message: SUCCESS.CREATE };
};

export const deleteLike = async (userId, coffeeId) => {
  await client.$queryRaw`
      DELETE 
      FROM coffees_likes cl
      WHERE
          cl.users_id=${userId}
        AND
          cl.coffees_id=${coffeeId};
    `;

  return { message: SUCCESS.DELETE };
};

export const findLikeByIds = async (userId, coffeeId) => {
  return client.$queryRaw`
    SELECT l.id 
    FROM coffees_likes l
    WHERE
        l.users_id=${userId}
      AND
        l.coffees_id=${coffeeId};
  `;
};
