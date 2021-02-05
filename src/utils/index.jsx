export const isFalsy = (value) => value === 0 ? false : !value;


//在函数中改变传入的对象会污染这个对象，可能引起bug
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach(key => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
