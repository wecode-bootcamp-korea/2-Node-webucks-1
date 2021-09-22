import prisma from './client';

const getCategory = async () => {
  const product = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM products p;`;

  return product;
};

const getProductInfo = async productId => {
  const id = productId;

  const product = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM product p
  WHERE p.id=${id};`;

  return product;
};

export default { getProductInfo, getProduct };
