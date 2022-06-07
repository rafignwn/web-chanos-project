import React, { useEffect, useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./pakanStyles.css";
import LinkHome from "../LinkHome/LinkHome";
import axios from "axios";

export default function MonitroingPakan() {
  const [sisaPakan, setSisaPakan] = useState(0);

  const dataPakanDefault = {
    items: ["Jam Pemberian Pakan Ikan", "Penggunaan Terakhir Pakan Ikan"],
    values: [["07:00", "13:00", "17:00"]],
    link: {
      title: "Beri Pakan Ikan",
      type: "button",
      action: async function (e) {
        console.log("Sedang memberi pakan ikan");
        e.currentTarget.classList.add("btn-wait");
        e.currentTarget.textContent = "Sedang Memberi Pakan...";
        let intervalPakan = setInterval(async () => {
          const res = await axios.get(
            "https://primus.somee.com/checkTimeToFeed"
          );
          console.log(res.data);
          if (res.data === 0) {
            const btnPakan =
              document.querySelector(".btn-wait") ||
              document.querySelector(".btn-goal");
            // pesan berhasil
            btnPakan.classList.remove("btn-wait");
            btnPakan.classList.add("btn-goal");
            btnPakan.textContent = "Berhasil Memberi Pakan";
            // delay 3 detik
            await new Promise((resolve) => setTimeout(resolve, 3000));
            // set button ke defaul
            btnPakan.classList.remove("btn-goal");
            btnPakan.textContent = "Beri Pakan Ikan";
            clearInterval(intervalPakan);
          }
        }, 3000);
        const response = await axios.get(
          "https://primus.somee.com/feedTheFish"
        );
        console.log(response.data);
      },
    },
  };

  const [dataPakan, setDataPakan] = useState(dataPakanDefault);

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
    // eslint-disable-next-line
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
