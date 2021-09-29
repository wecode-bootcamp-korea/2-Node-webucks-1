import prisma from './client';

const getCategory = async () => {
  const category = await prisma.$queryRaw`
    SELECT c.id, c.name
    FROM categories as c;
  `;
  return category;
};

const makeCategory = async () => {
  await prisma.$queryRaw`
    INSERT INTO categories (name)
    VALUES ("클램차우더");
  `;

  const [category] = await prisma.$queryRaw`
    SELECT c.id , c.name
    FROM categories as c
    ORDER BY id DESC
    LIMIT 1;
  `;

  return category;
};

export default { getCategory, makeCategory };