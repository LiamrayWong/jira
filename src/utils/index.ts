import { useEffect, useState } from "react";

export const isFalsy = (value:unknown) => value === 0 ? false : !value;


//在函数中改变传入的对象会污染这个对象，可能引起bug
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

//初始化数据
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
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

export const useDebounce = (value:unknown, delay?:number):any => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  //每次value变化执行一次
  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    //清除上一次的timerId
    return () => clearTimeout(timerId);
  }, [value, delay]);
  //value 设置为unknown，类型推断返回值也是unknown
  return debouncedValue;
};

