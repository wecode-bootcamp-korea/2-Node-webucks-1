import jwt from 'jsonwebtoken';
import { ERRORS, ROLES } from '../constances';
import { auth } from '../models/userDAO';

export const authMiddleWare = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization == 'undefined') {
    return next();
  }

  let id;

  try {
    const payload = jwt.verify(authorization, process.env.SECRET);
    id = payload.id;
  } catch (e) {
    return next(e);
  }

  auth(id, next).then(response => {
    if (response.ok) res.locals.user = response.data;
    return next();
  });
};

export const onlyForLoginAndActiveUser = (req, res, next) => {
  const {
    locals: { user },
  } = res;

  if (user && (user.role === ROLES.ACTIVEUSER || user.role === ROLES.MANAGER)) {
    return next();
  } else {
    return res.json({ ok: false, error: ERRORS.UNAUTH });
  }
};

export const onlyForManager = (req, res, next) => {
  const {
    locals: { user },
  } = res;
  if (user && user.role === ROLES.MANAGER) {
    return next();
  } else {
    return res.json({ ok: false, error: ERRORS.UNAUTH });
  }
};
