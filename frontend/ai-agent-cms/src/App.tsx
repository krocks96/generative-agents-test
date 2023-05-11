import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import AgentDetailPage from "./components/pages/AgentDetailPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agents/:id" element={<AgentDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;