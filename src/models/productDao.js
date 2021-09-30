import prisma from '../../prisma';

const addProduct = async (categoryId, koreanName, englishName) => {
  await prisma.$queryRaw`
  INSERT INTO products (category_id, korean_name, english_name)
  VALUES (${categoryId}, ${koreanName}, ${englishName});
  `;

  const products = await prisma.$queryRaw`
  SELECT 
    p.id, 
    p.korean_name, 
    p.english_name, 
    p.category_id
  FROM products p
  `;
  return products;
};

export default { addProduct };
