import jwt from 'jsonwebtoken';

export const authMiddleWare = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  try {
    if (authorization) {
      const { id } = jwt.verify(authorization, process.env.SECRET);
      res.locals.userId = id;
    }
    next();
  } catch (e) {
    next(e);
  }
};
3;
