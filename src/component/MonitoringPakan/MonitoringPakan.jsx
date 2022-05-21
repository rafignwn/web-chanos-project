import React, { useEffect, useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./pakanStyles.css";
import LinkHome from "../LinkHome/LinkHome";

const dataPakanDefault = {
  items: ["Jam Pemberian Pakan Ikan", "Penggunaan Terakhir Pakan Ikan"],
  values: [["07:00", "13:00", "17:00"]],
  link: {
    title: "Beri Pakan Ikan",
    type: "button",
    action: function (e) {
      console.log("Sedang memberi pakan ikan");
      const req = new XMLHttpRequest();
      req.onload = function () {
        console.log(this.responseText);
      };
      req.open("GET", "https://primus.somee.com/feedTheFish");
      req.send();
    },
  },
};

export default function MonitroingPakan() {
  const [dataPakan, setDataPakan] = useState(dataPakanDefault);
  const [sisaPakan, setSisaPakan] = useState(0);
  useEffect(() => {
    fetch("https://primus.somee.com/feedShortRecords")
      .then((res) => res.json())
      .then((data) => {
        setSisaPakan(data.sisaPakan);
        const waktu_pakan = format(
          parseISO(data.waktuPakan),
          "eeeeeeee, dd MMM yyyy HH:mm:ss",
          {
            locale: id,
          }
        );
        dataPakanDefault.values = [
          ...dataPakanDefault.values,
          [`${data.beratPakan} kg`, waktu_pakan],
        ];
        setDataPakan(dataPakanDefault);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-30">
      <LinkHome />
      <div className="monitoring-pakan">
        <h5>Informasi Monitoring Pakan Ikan</h5>
        <div className="body-monitoring">
          <ProgressBar value={sisaPakan} title={"Sisa Pakan"} />
          <ItemInfo data={dataPakan} titleInfo={"Info Pemberian pakan"} />
        </div>
      </div>
    </div>
  );
}
