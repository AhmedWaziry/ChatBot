import React, { useState } from "react";
import Style from "./Extension.module.css";
import ChatBotPage from "./ChatBotPage";

export default function Extension() {
  const [close, setClose] = useState(true);
  const isClosed = () => {
    setClose((prev) => !prev);
  };
  return (
    <div className={Style["extension"]}>
      <div className={Style["chat"]} style={{ display: close ? "none" : "" }}>
        <ChatBotPage isClosed={isClosed} />
      </div>

      <div className={Style["icon-button"]} onClick={isClosed}>
        UC
      </div>
    </div>
  );
}
