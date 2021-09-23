import prisma from '../../prisma';

const getProduct = async () => {
  const product = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, c.name, c.id, i.image_url
  FROM products p
  JOIN categories c
  ON c.id = p.category_id
  JOIN images i
  ON i.product_id = p.id
  `;
  return product;
};

const getProductOne = async productId => {
  const id = productId;

  const product = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, i.image_url
  FROM products p
  JOIN images i
  ON i.product_id = p.id
  WHERE p.id=${id}
  `;
  return product;
};

export default { getProductOne, getProduct };
