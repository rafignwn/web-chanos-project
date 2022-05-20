import React from "react";
import ItemInfo from "../ItemInfo/ItemInfo";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./pakanStyles.css";
import LinkHome from "../LinkHome/LinkHome";

export default function MonitroingPakan() {
  const tanggalPakanIkan = format(
    parseISO("2022-05-16 07:00:28"),
    "eeeeeeeeee, d MMM, yyyy ( hh:mm:ss )",
    {
      locale: id,
    }
  );
  const dataPakan = {
    items: ["Jam Pemberian Pakan Ikan", "Penggunaan Terakhir Pakan Ikan"],
    values: [
      ["07:00", "13:00", "17:00"],
      ["1kg", tanggalPakanIkan],
    ],
    link: {
      title: "Beri Pakan Ikan",
      type: "button",
      action: function (e) {
        e.preventDefault();
        console.log("Sedang memberi pakan ikan");
      },
    },
  };
  return (
    <div className="mt-30">
      <LinkHome />
      <div className="monitoring-pakan">
        <h5>Informasi Monitoring Pakan Ikan</h5>
        <div className="body-monitoring">
          <ProgressBar value={60} title={"Sisa Pakan"} />
          <ItemInfo data={dataPakan} titleInfo={"Info Pemberian pakan"} />
        </div>
      </div>
    </div>
  );
}
