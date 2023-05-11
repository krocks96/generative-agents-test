import React from "react";
import { Dashboard } from "../templates/Dashboard";
import AgentDetail from "../AgentDetail";

const AgentDetailPage: React.FC = () => {
  return (
    <Dashboard title="エージェント詳細">
        <AgentDetail/>
    </Dashboard>
  )
};

export default AgentDetailPage;