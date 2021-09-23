import prisma from './client';

const getProduct = async () => {
  const product = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM products as p;
  `;
  return product;
};

const getProductOne = async productId => {
  const id = productId;

  const product = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM products as p
  where p.id=${id};
  `;
  return product;
};

export default { getProductOne, getProduct };
