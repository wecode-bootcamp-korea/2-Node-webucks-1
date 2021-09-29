export const errorCatcher = fun => (req, res, next) =>
  fun(req, res, next).catch(e => next(e));
