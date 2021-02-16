import React, { useEffect, useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import { cleanObject } from "../../utils";
import {useMount,useDebounce} from "../../utils";
import * as qs from 'qs';
import { useHttp } from "../../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;


export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  });
  //从users中找到personId，读取db.json中的name属性
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 500);
  const client = useHttp()

  //param变化时，页面请求项目列表的接口
  useEffect(() => {
    client('projects',{data:cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam]);

  //初始化负责人列表
  useMount(() => {
    client('users').then(setUsers)
  });



  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>;
};




