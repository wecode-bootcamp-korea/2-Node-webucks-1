import prisma from '../client';

const getCategory = async () => {
  const category = await prisma.$queryRaw`
    SELECT c.id, c.name
    FROM categories c`;
  return category;
};

const setCategory = async name => {
  await prisma.$queryRaw(`
  INSERT INTO categories (name)
  VALUES (${name});`);

  const [category] = await prisma.$queryRaw(`
  SELECT c.id, c.name
  FROM categories c
  ORDER BY id DESC
  LIMIT 1;`);

  return category;
};

export default { getCategory, setCategory };
