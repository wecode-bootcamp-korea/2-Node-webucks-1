import prisma from '../../prisma';

const getCategory = async () => {
  const category = await prisma.$queryRaw`
  SELECT c.id, c.name FROM categories c
  `;
  return category;
};

const createCategory = async name => {
  await prisma.$queryRaw`
    INSERT INTO categories (name) VALUES (${name});
  `;
  const [newCategory] = await prisma.$queryRaw`
    SELECT id, name FROM categories WHERE name=${name};
  `;
  return newCategory;
};

export default { getCategory, createCategory };
