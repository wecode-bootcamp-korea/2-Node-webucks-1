import { ERRORS } from './constants';
import { loginUser } from './controllers/userController';

const emailValid = id => {
  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  return regExp.test(id);
};

const passwordValid = pw => {
  const regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{5,}/g;
  return regExp.test(pw);
};

export const isValid = terms => {
  const { email, password } = terms;
  return emailValid(email) && passwordValid(password);
};

export const isItemExist = item => {
  switch (Array.isArray(item)) {
    case true:
      return Array.isArray(item) && !!item.length;

    default:
      let signal = true;
      for (let keys in item) {
        if (!item[keys]) {
          signal = false;
        }
      }
      return signal;
  }
};

export const changeKeyName = (array, oldKey, newKey) => {
  for (let item of array) {
    item[newKey] = item[oldKey];
    delete item[oldKey];
  }
};

export const addAmILike = (array, userId) => {
  const newObj = {};
  const newArray = [];

  for (let item of array) {
    if (newObj[item.id] === undefined) newObj[item.id] = item;
    if (newObj[item.id].isLike === undefined) newObj[item.id].isLike = 0;
    if (item.users_id === userId) newObj[item.id].isLike += 1;
  }

  for (let key in newObj) {
    newObj[key].isLike = !!newObj[key].isLike;
    newArray.push(newObj[key]);
  }
  return newArray;
};

export const isBlackList = param => {
  const blackWords = ['join', 'insert', 'alter', 'drop', 'select', 'union'];

  for (let item of blackWords) {
    if (param.includes(item)) return true;
  }

  return false;
};

export const checkTermsValid = fun => (terms, next) =>
  isValid(terms) ? fun(terms, next) : { error: ERRORS.INVALID };

export const resResultHandler = fun => (result, statusCode) => {
  return result.error ? fun(result, statusCode) : fun(result);
};

export const ifOk = fun => args => {
  const { isOk, arg } = args;
  if (isOk) return fun(...arg);
};
