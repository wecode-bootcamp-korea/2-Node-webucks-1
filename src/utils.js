const wrapAsync = fn => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

const throwError = (errorMessage, statusCode) => {
  const err = new Error(errorMessage);
  err.status = statusCode;
  throw err;
};

export { wrapAsync, throwError };
