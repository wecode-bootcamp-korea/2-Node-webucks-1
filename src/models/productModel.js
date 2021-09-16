import client from './client';

export const findManyProducts = async () => {
  return client.$queryRaw`SELECT c.id, c.koreanName,c.englishName,c.description FROM coffees c;`;
};

export const findOneProduct = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  try {
    return client.coffee.findMany({
      where: {
        id: Number(id),
      },
      select: {
        size: {
          select: {
            name: true,
            amount: true,
          },
        },
        description: true,
        koreanName: true,
        englishName: true,
        allergy: {
          select: {
            name: true,
          },
        },
        Image: {
          select: {
            id: true,
            src: true,
          },
        },
      },
    });
  } catch (e) {
    next(e);
  }
};
