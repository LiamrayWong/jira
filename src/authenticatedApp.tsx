import React from "react";
import { useAuth } from "./context/authContext";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { Button, Dropdown, Menu } from "antd";
import { resetRoute, useDocumentTitle } from "./utils";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { ProjectModal } from "./screens/projectList/projectModal";
import { ProjectPopover } from "./components/projectPopover";
import { ProjectListScreen } from "screens/projectList";

export const AuthenticatedApp = () => {
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          style={{ padding: 0 }}
          type={"link"}
          onClick={resetRoute}
        >
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button onClick={(event) => event.preventDefault()} type={"link"}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
