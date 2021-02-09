import React from "react";

export interface Manager{
  id:string;
  name:string;
  email:string;
  title:string;
  organization: string;
}


interface SearchPanelProps {
  managers: Manager[],
  param: {
    name: string;
    personId: string;
  },
  setParam: (param:SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ managers, param, setParam }:SearchPanelProps) => {

  return (<form>
    <div>
      <input type="text" value={param.name} onChange={event => setParam({
        ...param,
        name: event.target.value
      })} />
      <select value={param.personId} onChange={event => setParam({
        ...param,
        personId: event.target.value
      })}>
        <option value="">负责人</option>
        {
          managers.map(manager => <option key={manager.id} value={manager.id}>{manager.name}</option>)
        }
      </select>
    </div>
  </form>);
};
