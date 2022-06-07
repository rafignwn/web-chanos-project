import React, { useEffect, useRef, useState } from "react";
import ToplesCupang from "../Toples/ToplesCupang";
import ItemInfo from "../ItemInfo/ItemInfo";
import "./boardStyles.css";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

const data_default = {
  link: {
    title: "Monitoring pH Air",
    type: "link",
    navigateTo: "monitoring-ph",
  },
  items: ["Nilai pH Saat Ini", "Level pH"],
};
const data_pakan_default = {
  link: {
    title: "Monitoring Pakan",
    type: "link",
    navigateTo: "monitoring-pakan",
  },
  items: ["Sisa Pakan Ikan", "Penggunaan Pakan Terakhir"],
};

export default function InfoBoard() {
  const [dataPh, setDataPh] = useState(data_default);
  const [dataPakan, setDataPakan] = useState(data_pakan_default);
  const [pHValue, setPhValue] = useState(0);
  const bodyInfo = useRef();

  useEffect(() => {
    fetch("https://primus.somee.com/getPrimusSummary")
      .then((res) => res.json())
      .then((data) => {
        setPhValue(data.nilaiPh);
        setDataPh({
          ...data_default,
          values: [[data.nilaiPh], [data.levelPh]],
        });
      })
      .catch((err) => console.log(err));
    fetch("https://primus.somee.com/feedShortRecords")
      .then((res) => res.json())
      .then((data) => {
        const waktu_pakan = format(
          parseISO(data.waktuPakan),
          "eeeeeee, dd MMM yyyy HH:mm:ss",
          { locale: id }
        );
        console.log(waktu_pakan);
        setDataPakan({
          ...data_pakan_default,
          values: [
            [`${data.sisaPakan}%`],
            [`${data.beratPakan} kg`, waktu_pakan],
          ],
        });
      })
      .catch((err) => console.log(err));
  }, []);

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    if (bodyInfo.current.offsetWidth < 600) {
      bodyInfo.current.style.cursor = "grabbing";
      bodyInfo.current.style.userSelect = "none";
    }

    pos = {
      left: bodyInfo.current.scrollLeft,
      top: bodyInfo.current.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    bodyInfo.current.scrollTop = pos.top - dy;
    bodyInfo.current.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    if (bodyInfo.current.offsetWidth < 600) {
      bodyInfo.current.style.cursor = "grab";
    } else {
      bodyInfo.current.style.cursor = "default";
    }
    bodyInfo.current.style.removeProperty("user-select");

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  return (
    <div className="info-board">
      <div className="item-some-info">
        <h4 className="info-title">Dashboard Informasi</h4>
        <div
          className="info-body"
          ref={bodyInfo}
          onMouseDown={mouseDownHandler}
        >
          <div className="wrap-info">
            <ItemInfo data={dataPh} titleInfo={"Kondisi Ph Air Tambak"} />
            <ItemInfo titleInfo={"Kondisi Pakan Ikan"} data={dataPakan} />
          </div>
        </div>
      </div>
      <div className="item-toples">
        <ToplesCupang value={pHValue ? `pH ${pHValue}` : ""} />
      </div>
    </div>
  );
}
