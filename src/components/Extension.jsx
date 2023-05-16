import React, { useState, useEffect } from "react";
import Style from "./Extension.module.css";
import ChatBotPage2 from "./ChatBotPage2";
//export const baseURL = "http://localhost:8000";
export const baseURL = "https://api.usual.chat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function Extension({ id }) {
  const [close, setClose] = useState(true);
  const isClosed = () => {
    setClose((prev) => !prev);
  };
  const [logo, setLogo] = useState(null);
  const [color, setColor] = useState("#FD9053");

  useEffect(() => {
    const url = `${baseURL}/chatbot/${id}/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.extension_color) setColor(res.extension_color);
        if (res.extension_logo) setLogo(res.extension_logo);
      });
  }, []);
  return (
    <div className={Style["extension"]}>
      <div className={Style["chat"]} style={{ display: close ? "none" : "" }}>
        <ChatBotPage2 isClosed={isClosed} id={id} />
      </div>
      <div
        className={Style["icon-button"]}
        style={{ backgroundColor: color }}
        onClick={isClosed}
      >
        {logo === null ? (
          <ChatBubbleOutlineIcon />
        ) : (
          <img
            alt="logo"
            src={logo === null ? "" : baseURL + logo}
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        )}
      </div>
    </div>
  );
}
