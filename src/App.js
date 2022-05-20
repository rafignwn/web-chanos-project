import React from "react";
import "./App.css";
import InfoBoard from "./component/Board/InfoBoard";
import TitleProject from "./component/Header/TitleProject";
import { Routes, Route } from "react-router-dom";
import MonitoringPh from "./component/MonitoringPh/MonitoringPh";
import MonitroingPakan from "./component/MonitoringPakan/MonitoringPakan";

function App() {
  return (
    <div className="container">
      <TitleProject />
      <Routes>
        <Route path="/" element={<InfoBoard />} />
        <Route path="/monitoring-ph" element={<MonitoringPh />} />
        <Route path="/monitoring-pakan" element={<MonitroingPakan />} />
      </Routes>
    </div>
  );
}

export default App;
