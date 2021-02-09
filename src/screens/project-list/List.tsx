import React from "react";
import { Manager } from "./SearchPanel";

interface Project{
  id: string;
  name:string;
  personId: string;
  pin:boolean;
  organization: string;
}


interface ListProps {
  list:Project[];
  managers: Manager[];
}

export const List = ({ managers, list }:ListProps) => {
  return <table>
    <thead>
    <tr>
      <th>项目</th>
      <th>负责人</th>
    </tr>
    </thead>
    <tbody>
    {
      list.map(project => <tr key={project.id}>
        <td>{project.name}</td>
        <td>{managers.find(manager => manager.id === project.personId)?.name || "未知"}</td>
      </tr>)
    }
    </tbody>
  </table>;
};

