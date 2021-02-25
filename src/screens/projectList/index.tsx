import React from "react";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/projects";
import { Button, Typography } from "antd";
import { useUsers } from "../../utils/useUsers";
import { useProjectsSearchParams } from "./utile";
import { Row } from "components/lib";

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 500)
  );
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
