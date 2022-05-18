import React from "react";
import { Link } from "react-router-dom";
import GrafikPh from "../grafik/GrafikPh";
import InfoMonitoring from "./InfoMonitoring";
import "./monitoringPhStyles.css";

export default function MonitoringPh() {
  return (
    <div className="box-monitoring">
      <Link className="link-back" to={"/"}>
        {"<< Kembali"}
      </Link>
      <div className="monitoring-ph">
        <GrafikPh />
        <InfoMonitoring />
      </div>
    </div>
  );
}
