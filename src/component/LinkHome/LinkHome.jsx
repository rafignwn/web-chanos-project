import React from "react";
import { Link } from "react-router-dom";
import "./linkHomeStyles.css";

export default function LinkHome() {
  return (
    <Link className="link-back" to={"/"}>
      {"<< Kembali"}
    </Link>
  );
}
