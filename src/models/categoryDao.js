import prisma from '../../prisma';

const createCategory = async name => {
  await prisma.$queryRaw`
    INSERT INTO categories (name) VALUES (${name});
  `;
  const [newCategory] = await prisma.$queryRaw`
    SELECT id, name FROM categories WHERE name=${name};
  `;
  return newCategory;
};

export default { createCategory };
