import React from "react";

export const List = ({ managers, list }) => {
  return <table>
    <thead>
    <tr>
      <th>部门</th>
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

