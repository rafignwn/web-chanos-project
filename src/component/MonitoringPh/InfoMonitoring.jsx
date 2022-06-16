import React, { useEffect, useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";

const items = {
  items: ["Nilai pH Saat Ini", "Level pH", "Kondisi pH Tambak", "Jumlah Data"],
};

export default function InfoMonitoring({ jumlah_data }) {
  const [dataPh, setDataPh] = useState(items);
  useEffect(() => {
    fetch("https://primus.somee.com/getPrimusSummary", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setDataPh({
          ...items,
          values: [
            [data.nilaiPh],
            [data.levelPh],
            [data.kondisi],
            [jumlah_data],
          ],
        });
      })
      .catch((err) => console.log(err));
  }, [jumlah_data]);
  return (
    <div className="info-monitoring">
      <ItemInfo data={dataPh} titleInfo={"Informasi Monitoring"} />
    </div>
  );
}
