import React, { useEffect, useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import { cleanObject } from "../../utils";
import {useMount,useDebounce} from "../../utils";
import * as qs from 'qs';

const apiUrl = process.env.REACT_APP_API_URL;


export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  });
  //从managers中找到personId，读取db.json中的name属性
  const [managers, setManagers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 500);


  //param变化时，页面请求项目列表的接口
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if (response.ok) {
        //保存项目列表的数据
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  //初始化负责人列表
  useMount(() => {
    fetch(`${apiUrl}/managers`).then(async response => {
      if (response.ok) {
        //保存负责人列表的数据
        setManagers(await response.json());
      }
    });
  });



  return <div>
    <SearchPanel managers={managers} param={param} setParam={setParam} />
    <List managers={managers} list={list} />
  </div>;
};




