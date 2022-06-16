import React, { useState } from "react";
import GrafikPh from "../grafik/GrafikPh";
import LinkHome from "../LinkHome/LinkHome";
import InfoMonitoring from "./InfoMonitoring";
import "./monitoringPhStyles.css";

export default function MonitoringPh() {
  const [jumlahData, setJumlahData] = useState(0);
  return (
    <div className="mt-30">
      <LinkHome />
      <div className="monitoring-ph">
        <GrafikPh handlerJumlahData={setJumlahData} />
        <InfoMonitoring jumlah_data={jumlahData} />
      </div>
    </div>
  );
}
