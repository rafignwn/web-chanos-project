import React from "react";
import "./App.css";
import InfoBoard from "./component/Board/InfoBoard";
// import Card from "./component/Card/Card";
import GrafikPh from "./component/grafik/GrafikPh";
import TitleProject from "./component/Header/TitleProject";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <TitleProject />
      <Routes>
        <Route path="/" element={<InfoBoard />} />
        <Route path="/monitoring-ph" element={<GrafikPh />} />
      </Routes>
    </div>
  );
}

export default App;
