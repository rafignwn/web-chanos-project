import React, { useEffect, useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";

export default function InfoMonitoring() {
  const [dataPh, setDataPh] = useState([]);
  useEffect(() => {
    fetch("https://primus.somee.com/getPrimusSummary", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setDataPh([
          {
            title: "Nilai pH Saat Ini",
            value: data.nilaiPh,
          },
          {
            title: "Level pH",
            value: data.levelPh,
          },
          {
            title: "Kondisi Tambak Ikan",
            value: data.kondisi,
          },
          {
            title: "Jumlah Data",
            value: data.jumlah_data,
          },
        ]);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div className="info-monitoring">
      <ItemInfo data={dataPh} titleInfo={"Informasi Monitoring"} />
    </div>
  );
}
