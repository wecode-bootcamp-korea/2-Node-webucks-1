import prisma from '../../prisma';

const allProducts = async categoryId => {
  const products = await prisma.$queryRaw`
  SELECT 
    p.id, 
    p.korean_name, 
    p.english_name, 
    c.name, 
    c.id, 
    i.image_url
  FROM products p
  JOIN categories c
  ON c.id = p.category_id
  JOIN images i
  ON i.product_id = p.id
  WHERE c.id=${categoryId}
  `;
  return products;
};

export default { allProducts };
