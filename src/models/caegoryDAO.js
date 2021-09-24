import client from '.';

export const findManyCategories = async () => {
  return client.$queryRaw`
  SELECT 
    c.key,
    c.name 
  FROM categories c 
  ORDER BY c.key ASC;`;
};
