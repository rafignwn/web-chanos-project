import React from "react";
import "./App.css";
import InfoBoard from "./component/Board/InfoBoard";
import TitleProject from "./component/Header/TitleProject";
import { Routes, Route } from "react-router-dom";
import MonitoringPh from "./component/MonitoringPh/MonitoringPh";

function App() {
  return (
    <div className="container">
      <TitleProject />
      <Routes>
        <Route path="/" element={<InfoBoard />} />
        <Route path="/monitoring-ph" element={<MonitoringPh />} />
      </Routes>
    </div>
  );
}

export default App;
