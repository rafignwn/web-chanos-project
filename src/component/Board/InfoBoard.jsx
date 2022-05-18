import React, { useEffect, useState } from "react";
import ToplesCupang from "../Toples/ToplesCupang";
import { Link } from "react-router-dom";

export default function InfoBoard() {
  const [summary, setSummary] = useState({});
  useEffect(() => {
    fetch("https://primus.somee.com/getPrimusSummary", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.log(err));
  });

  return (
    <div className="info-board">
      <div className="item-some-info">
        <h4 className="info-title">Sedikit Informasi</h4>
        <div className="info-body">
          <div className="wrap-info">
            <div className="info info-ph">
              <h5>Kondisi pH Air Tambak</h5>
              <ul>
                <li>
                  Nilai pH Saat Ini <br />
                  <span>{summary.nilaiPh}</span>
                </li>
                <li>
                  Level pH <br />
                  <span>{summary.levelPh}</span>
                </li>
                <li>
                  <Link to={"monitoring-ph"}>Live Monitoring pH Air</Link>
                </li>
              </ul>
            </div>
            <div className="info info-pakan ">
              <h5>Kondisi Pakan Ikan</h5>
              <ul>
                <li>
                  Sisa Pakan Ikan <br />
                  <span>70%</span>
                </li>
                <li>
                  Penggunaan Pakan Terakhir <br />
                  <span>1kg</span>
                </li>
                <li>
                  <a href="/pakanIkan">Monitoring Pakan Ikan</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="item-toples">
        <ToplesCupang value={summary.nilaiPh ? `pH ${summary.nilaiPh}` : ""} />
      </div>
    </div>
  );
}
