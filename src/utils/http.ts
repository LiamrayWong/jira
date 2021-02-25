import qs from "qs";
import * as auth from "authProvider";
import { useAuth } from "../context/authContext";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

//参数有默认值，自动变为可选的参数
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      //"A token must be provided" 未登录或token失效返回401
      if (response.status === 401) {
        await auth.logout();
        //刷新页面
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = response.json();
      if (response.ok) {
        return data;
      } else {
        //fetch用catch无法捕获来自服务端的异常（401或500），只能捕获网络失败、断网的异常；axios可以返回状态不为2xx的异常
        return Promise.reject(data);
      }
    });
};

//自动传入token
export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, {
        ...config,
        token: user?.token,
      }),
    [user?.token]
  );
};
