import { ERRORS } from '../constances';
import { isBlackList } from '../utils';

export const commonMiddleWare = (req, res, next) => {
  const { params, body, query } = req;

  let isBlack = false;

  for (let key in body) {
    if (isBlackList(body[key])) {
      isBlack = true;
      break;
    }
  }

  for (let key in params) {
    if (isBlackList(params[key])) {
      isBlack = true;
      break;
    }
  }

  for (let key in query) {
    if (isBlackList(query[key])) {
      isBlack = true;
      break;
    }
  }

  if (isBlack) {
    res.json({
      ok: false,
      error: ERRORS.WRONGREQ,
    });
    return;
  }

  next();
};
