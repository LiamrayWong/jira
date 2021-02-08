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

//初始化数据
export const useMount = (callback) => {
  useEffect(()=>{
    callback()
  },[])
};

// export const useDebounce = (value, delay) => {
//     let timerId = null;
//     let result = {...value}
//     return ()=>{
//       if(timerId){
//         clearTimeout(timerId)
//         result = null
//       }
//       timerId = setTimeout(()=>{
//         return result
//       },delay)
//     }
// };

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  //每次value变化执行一次
  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    //清除上一次的timerId
    return () => clearTimeout(timerId);
  }, [value, delay]);
  return debouncedValue;
};

