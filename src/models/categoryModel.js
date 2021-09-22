import prisma from './client';

const getCategory = async () => {
  const category = await prisma.$queryRaw`
    SELECT c.id, c.name
    FROM categories c`;
  return category;
};

const setCategory = async () => {
  await prisma.$queryRaw`
  INSERT INTO categories (name)
  VALUES (클램차우더");`;

  const [category] = await prisma.$queryRaw`
  SELECT c.id, c.name
  FROM categories c
  ORDER BY id DESC
  LIMIT 1;`;

  return category;
};

export default { getCategory, setCategory };
