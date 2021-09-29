import prisma from '../client';

const getProduct = async () => {
  const product = await prisma.$queryRaw(`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM products p;
  JOIN categories c
  ON c.id = p.category_id`);

  return product;
};

const getProductOne = async productId => {
  const id = productId;

  const product = await prisma.$queryRaw(`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM product p
  WHERE p.id=${id};
  `);

  return product;
};

export default { getProductOne, getProduct };
