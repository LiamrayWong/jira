import React, { useEffect, useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

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
  const client = useHttp();

  //param变化时，页面请求项目列表的接口
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  //初始化负责人列表
  useMount(() => {
    client("users").then(setUsers);
  });


  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};


const Container = styled.div`
  padding: 3.2rem;
`;
