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

export const isValid = (email, password) => {
  return emailValid(email) && passwordValid(password);
};

export const isItemExist = item => {
  if (typeof item === 'object') {
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
  }
};

export const offsetPagnation = (array, limit, offset) => {
  if (!offset) return array.slice(0, limit);

  const newArray = [];
  let offsetIndex = 0;
  for (let i = 0; i < array.length; i++) {
    if (newArray.length == limit) break;

    if (array[i].id == offset) {
      offsetIndex = i;
      continue;
    }

    if (offsetIndex) newArray.push(array[i]);
  }

  return newArray;
};
