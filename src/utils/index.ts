import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

//在函数中改变传入的对象会污染这个对象，可能引起bug；object的类型覆盖所有引用类型包括函数
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//初始化数据
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useDebounce = <V>(value: V, delay?: number) => {
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  //const oldTitle = document.title
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  //useEffect没有传入依赖，只在页面加载的时候执行一次，因此读取的 `oldTitle` 的值是页面加载时的值；
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
