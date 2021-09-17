import client from './client';

export const findManyProducts = async () => {
  return client.$queryRaw`SELECT c.id, c.koreanName,c.englishName,c.description FROM coffees c;`;
};

export const findOneProduct = async (req, next) => {
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

export const updateLike = async coffeeId => {
  const {
    locals: { user },
  } = req;

  try {
    const isExist = await client.coffeeLike.findUnique({
      where: {
        userId_coffeeId: {
          userId: user.id,
          coffeeId,
        },
      },
    });

    if (isExist) {
      await client.coffeeLike.update({
        where: {
          userId_coffeeId: {
            userId: user.id,
            coffeeId,
          },
        },
        data: {
          coffee: {
            disconnect: true,
          },
          user: {
            disconnect: true,
          },
        },
      });
    } else {
      await client.coffeeLike.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          coffee: {
            connect: {
              id: coffeeId,
            },
          },
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};
