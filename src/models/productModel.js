import prisma from './client';

const getProducts = async () => {
  const products = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM products as p;
  `;
  return products;
};

const getProduct = async productId => {
  const id = productId;

  const [product] = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM products as p
  where p.id=${id};
  `;
  return product;
};

export default { getProducts, getProduct };
