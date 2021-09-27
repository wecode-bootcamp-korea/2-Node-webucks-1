import prisma from '../../prisma';

const getCategory = async () => {
  const categories = await prisma.$queryRaw`
  SELECT 
  c.id, 
  c.name
  From 
  categories c;
  `;

  return categories;
};

export default { getCategory };
