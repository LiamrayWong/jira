import React from "react";
import { ProjectListScreen } from "./screens/projectList";
import { useAuth } from "./context/authContext";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { Raw } from "./components/lib";
import { Button, Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={<Menu>
            <Menu.Item key={"logout"}>
              <Button onClick={logout} type={"link"}>登出</Button>
            </Menu.Item>
          </Menu>}>
            <Button onClick={event => event.preventDefault()} type={"link"}>Hi, {user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
  );
};


const Header = styled(Raw)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;


const HeaderLeft = styled(Raw)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
