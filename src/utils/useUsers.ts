import { useHttp } from "./http";
import { cleanObject } from "./index";
import { useAsync } from "./useAsync";
import { User } from "../screens/projectList/SearchPanel";
import { useEffect } from "react";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
