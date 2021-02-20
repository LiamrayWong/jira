import React, { useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/useProjects";
import { Typography } from "antd";
import { useUsers } from "../../utils/useUsers";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  //从users中找到personId，读取db.json中的name属性

  const debouncedParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  console.log(error);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
