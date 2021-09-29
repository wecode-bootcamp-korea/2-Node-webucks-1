import { ERRORS } from './constants';
import { loginUser } from './controllers/userController';

const emailValid = email => {
  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  return regExp.test(email);
};

const passwordValid = passowrd => {
  const regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{5,}/g;
  return regExp.test(passowrd);
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

export const ifOk = fun => args => {
  const { isOk, body, e, next } = args;

  switch (typeof fun) {
    case 'function':
      return isOk ? fun(body, next) : next(e);

    default:
      return isOk ? body : next(e);
  }
};
