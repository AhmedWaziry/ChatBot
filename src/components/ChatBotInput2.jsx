import React, { useState } from "react";
import Style from "./ChatBotInput2.module.css";
import Vector1 from "../assets/Vector1.png";

function ChatBotInput2(props) {
  const [message, setMessage] = useState("");
  const textAreaRef = React.useRef(null);
  const handleInputChange = (e) => {
    if (message === "" && e.target.value === "\n") return;

    setMessage(e.target.value);
  };
  React.useLayoutEffect(() => {
    const lineHeight = parseInt(
      getComputedStyle(textAreaRef.current).getPropertyValue("line-height")
    );
    console.log(lineHeight);
    textAreaRef.current.style.height = lineHeight + 15 + "px";
    textAreaRef.current.style.height = `${Math.max(
      Math.min(textAreaRef.current.scrollHeight, lineHeight * 5 + 15),
      lineHeight + 4
    )}px`;
  }, [message]);

  const handleClick = (e) => {
    if (props.loading || props.disable) return;

    if (
      (e.key === "Enter" && !e.shiftKey && message !== "") ||
      (message !== "" && e.target.name !== "input")
    ) {
      props.addMessage(message, true);
      setMessage("");
    }
  };

  return (
    <div className={Style["chat-input"]}>
      <textarea
        //type="text"
        className={Style["input-text"]}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleClick}
        name="input"
        placeholder="Ask me a question"
        ref={textAreaRef}
        autoFocus
      />
      <div
        className={Style["submit-button"]}
        onClick={handleClick}
        style={{
          backgroundColor: props.loading && "gray",
        }}
      >
        <img src={Vector1} className={Style["submit-icon"]} />
      </div>
    </div>
  );
}

export default ChatBotInput2;
