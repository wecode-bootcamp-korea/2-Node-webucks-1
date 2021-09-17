import client from './client';

export const findManyCategories = async () => {
  return client.$queryRaw`SELECT c.id,c.name FROM categories c ORDER BY id ASC;`;
};
