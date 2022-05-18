import React from "react";
import { Link } from "react-router-dom";
import "./ItemInfoStyles.css";

export default function ItemInfo({ data, titleInfo }) {
  return (
    <div className="info">
      <h5>{titleInfo}</h5>
      <ul>
        {data.map((item, index) => {
          if (item.link) {
            return (
              <li className="link" key={index}>
                <Link to={item.link.navigateTo}>{item.link.title}</Link>
              </li>
            );
          }
          return (
            <li key={index}>
              {item.title} <br /> <span>{item.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
