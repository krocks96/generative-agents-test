import React from "react";
import { Dashboard } from "../templates/Dashboard";
import AgentTable from "../AgentTable";

const HomePage: React.FC = () => {
  return (
    <Dashboard title="トップページ">
        <AgentTable/>
    </Dashboard>
  )
};

export default HomePage;