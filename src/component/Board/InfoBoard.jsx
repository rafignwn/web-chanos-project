import React, { useEffect, useState } from "react";
import ToplesCupang from "../Toples/ToplesCupang";
import ItemInfo from "../ItemInfo/ItemInfo";
import "./boardStyles.css";

export default function InfoBoard() {
  const [dataPh, setDataPh] = useState([]);
  const [pHValue, setPhValue] = useState(0);
  useEffect(() => {
    fetch("https://primus.somee.com/getPrimusSummary", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setPhValue(data.nilaiPh);
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
            link: {
              title: "Live Monitoring pH Air",
              navigateTo: "monitoring-ph",
            },
          },
        ]);
      })
      .catch((err) => console.log(err));
  });

  const dataPakanIkan = [
    {
      title: "Sisa Pakan Ikan",
      value: "70%",
    },
    {
      title: "Penggunaan Pakan Terakhir",
      value: "1kg",
    },
    {
      link: {
        title: "Monitoring Pakan Ikan",
        navigateTo: "monitoring-pakan",
      },
    },
  ];

  return (
    <div className="info-board">
      <div className="item-some-info">
        <h4 className="info-title">Sedikit Informasi</h4>
        <div className="info-body">
          <div className="wrap-info">
            <ItemInfo data={dataPh} titleInfo={"Kondisi Ph Air Tambak"} />
            <ItemInfo titleInfo={"Kondisi Pakan Ikan"} data={dataPakanIkan} />
          </div>
        </div>
      </div>
      <div className="item-toples">
        <ToplesCupang value={pHValue ? `pH ${pHValue}` : ""} />
      </div>
    </div>
  );
}
