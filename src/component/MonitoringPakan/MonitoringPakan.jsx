import React, { useEffect, useMemo, useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./pakanStyles.css";
import LinkHome from "../LinkHome/LinkHome";
import axios from "axios";

export default function MonitroingPakan() {
  const [sisaPakan, setSisaPakan] = useState(0);
  const [fixDataPakan, setFixDataPakan] = useState(null);

  function parseTime(waktu) {
    return format(parseISO(waktu), "eeeeeeee, dd MMM yyyy HH:mm:ss", {
      locale: id,
    });
  }

  async function getDataPakan() {
    const res = await axios.get("https://primus.somee.com/feedShortRecords");
    return res.data;
  }

  const dataPakanDefault = useMemo(() => {
    return {
      items: ["Jam Pemberian Pakan Ikan", "Penggunaan Terakhir Pakan Ikan"],
      values: [["08:00", "16:30"]],
      link: {
        title: "Beri Pakan Ikan",
        type: "button",
        action: async function (e) {
          e.currentTarget.classList.add("btn-wait");
          e.currentTarget.textContent = "Sedang Memberi Pakan...";
          let intervalPakan = setInterval(async () => {
            const res = await axios.get(
              "https://primus.somee.com/checkTimeToFeed"
            );
            if (res.data === 0) {
              const btnPakan =
                document.querySelector(".btn-wait") ||
                document.querySelector(".btn-goal");
              // update data pakan
              const newData = await getDataPakan();
              dataPakanDefault.values = [
                ["08:00", "16:00"],
                [`${newData.beratPakan} gram`, parseTime(newData.waktuPakan)],
              ];
              setFixDataPakan(dataPakanDefault);
              setSisaPakan(newData.sisaPakan);
              // pesan berhasil
              btnPakan.classList.remove("btn-wait");
              btnPakan.classList.add("btn-goal");
              btnPakan.textContent = "Berhasil Memberi Pakan";
              // delay 3 detik
              await new Promise((resolve) => setTimeout(resolve, 3000));
              // set button ke defaul
              btnPakan.classList.remove("btn-goal");
              btnPakan.textContent = "Beri Pakan Ikan";
              // clear interval cek kondisi makan
              clearInterval(intervalPakan);
            }
          }, 3000);
          await axios.get("https://primus.somee.com/feedTheFish");
        },
      },
    };
  }, []);

  const [dataPakan, setDataPakan] = useState(dataPakanDefault);

  useEffect(() => {
    if (fixDataPakan) {
      setDataPakan(fixDataPakan);
    } else {
      (async function () {
        const data = await getDataPakan();
        setSisaPakan(data.sisaPakan);

        dataPakanDefault.values = [
          ...dataPakanDefault.values,
          [`${data.beratPakan} gram`, parseTime(data.waktuPakan)],
        ];
        setDataPakan(dataPakanDefault);
      })();
    }
    // eslint-disable-next-line
  }, [fixDataPakan, dataPakan]);

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
