import React, { useState } from "react";
import Style from "./ChatBotInput.module.css";
import Vector1 from "../assets/Vector1.png";

function ChatBotInput(props) {
  const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleClick = () => {
    if (message !== "") {
      props.addMessage(message, true);
      setMessage("");
    }
  };
  const handleClickKey = (e) => {
    if (e.key === "Enter" && message !== "") {
      props.addMessage(message, true);
      setMessage("");
    }
  };
  return (
    <div className={Style["chat-input"]}>
      <input
        type="text"
        className={Style["input-text"]}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleClickKey}
        placeholder="Example : What's Usual.Chat ?"
        autoFocus
      />
      <div
        className={Style["submit-button"]}
        onClick={handleClick}
        style={{
          backgroundColor: props.primary_color,
        }}
      >
        <img alt="vector" src={Vector1} className={Style["submit-icon"]} />
      </div>
    </div>
  );
}

export default ChatBotInput;
