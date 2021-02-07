import { useEffect, useState } from "react";

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

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, [callback]);
};


export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  //每次value变化执行一次
  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timerId = setTimeout(() => setDebouncedValue(value), value);
    //清除上一次的timerId
    return () => clearTimeout(timerId);
  }, [value, delay]);
  return debouncedValue;
};

