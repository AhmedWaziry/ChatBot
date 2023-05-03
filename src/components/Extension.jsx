import React, { useState } from "react";
import Style from "./Extension.module.css";
import ChatBotPage2 from "./ChatBotPage2";

export default function Extension({ id }) {
  const [close, setClose] = useState(true);
  const isClosed = () => {
    setClose((prev) => !prev);
  };
  return (
    <div className={Style["extension"]}>
      <div className={Style["chat"]} style={{ display: close ? "none" : "" }}>
        <ChatBotPage2 isClosed={isClosed} id={id} />
      </div>
      <div className={Style["icon-button"]} onClick={isClosed}>
        UC
      </div>
    </div>
  );
}
