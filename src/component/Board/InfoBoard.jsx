import React, { useEffect, useState } from "react";
import ToplesCupang from "../Toples/ToplesCupang";
import ItemInfo from "../ItemInfo/ItemInfo";
import "./boardStyles.css";

const data_default = {
  link: {
    title: "Monitoring pH Air",
    type: "link",
    navigateTo: "monitoring-ph",
  },
  items: ["Nilai pH Saat Ini", "Level pH"],
};

export default function InfoBoard() {
  const [dataPh, setDataPh] = useState(data_default);
  const [pHValue, setPhValue] = useState(0);
  useEffect(() => {
    fetch("https://primus.somee.com/getPrimusSummary", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setPhValue(data.nilaiPh);
        setDataPh({
          ...data_default,
          values: [[data.nilaiPh], [data.levelPh]],
        });
      })
      .catch((err) => console.log(err));
  });

  const dataPakanIkan = {
    link: {
      title: "Monitoring Pakan",
      type: "link",
      navigateTo: "monitoring-pakan",
    },
    items: ["Sisa Pakan Ikan", "Penggunaan Pakan Terakhir"],
    values: [["70%"], ["1kg"]],
  };

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
