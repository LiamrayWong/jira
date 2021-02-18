import React from "react";
import { ProjectListScreen } from "./screens/projectList";
import { useAuth } from "./context/authContext";
import { LongButton } from "./unauthenticatedApp";

export const AuthenticatedApp = () => {
  const {logout} = useAuth()
  return (
    <div>
      <LongButton onClick={logout}>登出</LongButton>
      <ProjectListScreen />
    </div>
  );
};
