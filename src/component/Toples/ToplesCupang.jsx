import React from "react";
import "./toplesStyles.css";

export default function ToplesCupang({ value }) {
  return (
    <div className="section">
      <div className="shadow"></div>
      <div className="toples" id="wrapFix">
        <div className="liquid">
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
}
