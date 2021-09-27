import prisma from '../../prisma';

const getProduct = async () => {
  const products = await prisma.$queryRaw`
    SELECT d.id, d.category_id, d.korean_name, d.english_name, c.name, i.image_url
    FROM drinks d
    JOIN categories c
    ON c.id = d.category_id
    JOIN images i
    ON d.id = i.drink_id`;

  return products;
};

const getProductOne = async drinkId => {
  const id = drinkId;

  const product = await prisma.$queryRaw`
  SELECT d.id, d.category_id, d.korean_name, d.english_name, i.image_url
  FROM drinks d
  JOIN images i
  ON d.id = i.drink_id
  WHERE d.id=${id}`;

  return product;
};

export default { getProduct, getProductOne };
