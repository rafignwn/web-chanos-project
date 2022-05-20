import React from "react";
import GrafikPh from "../grafik/GrafikPh";
import LinkHome from "../LinkHome/LinkHome";
import InfoMonitoring from "./InfoMonitoring";
import "./monitoringPhStyles.css";

export default function MonitoringPh() {
  return (
    <div className="mt-30">
      <LinkHome />
      <div className="monitoring-ph">
        <GrafikPh />
        <InfoMonitoring />
      </div>
    </div>
  );
}
