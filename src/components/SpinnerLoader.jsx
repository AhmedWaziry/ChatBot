import React from "react";
import Style from "./SpinnerLoader.module.css";
export default function SpinnerLoader({
  height = "0vh",
  backgroundColor = "white",
}) {
  console.log({ height });
  return (
    <div
      className={Style["loading-container"]}
      style={{
        height: `calc(100vh - ${height})`,
        backgroundColor: backgroundColor,
      }}
    >
      <div className={Style["loading-spinner"]} />
    </div>
  );
}
