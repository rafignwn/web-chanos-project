import React, { useEffect, useState } from "react";
import "./cardStyles.css";

export default function Card({ element }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://primus.somee.com/getPrimusSummary", {
      method: "get",
    })
      .then((res) => res.json())
      .then((dt) => {
        console.log(dt);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [data]);
  return (
    <div className="card">
      <div className="card-body"></div>
    </div>
  );
}
