import prisma from '../../prisma';

const getCategory = async () => {
  const category = await prisma.$queryRaw`
  SELECT c.id, c.name FROM categories c
  `;
  return category;
};

const setCategory = async name => {
  return await prisma.$queryRaw`
    INSERT INTO categories (name)
    VALUES (${name});
  `;
};

export default { getCategory, setCategory };
