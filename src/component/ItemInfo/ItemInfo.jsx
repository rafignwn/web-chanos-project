import React from "react";
import { Link } from "react-router-dom";
import "./ItemInfoStyles.css";

export default function ItemInfo({ data, titleInfo }) {
  return (
    <div className="info">
      <h5>{titleInfo}</h5>
      <ul>
        {data.items.map((item, index) => {
          return (
            typeof item === "string" && (
              <li key={index}>
                {item} <br /> {data.values && <span>{data.values[index]}</span>}
              </li>
            )
          );
        })}
      </ul>
      {data.link && (
        <div className="link">
          <Link to={data.link.navigateTo}>{data.link.title}</Link>
        </div>
      )}
    </div>
  );
}
