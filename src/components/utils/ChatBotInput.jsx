import React, { useState } from "react";
import Style from "./ChatBotInput.module.css";
import SendIcon from "@mui/icons-material/Send";

function ChatBotInput(props) {
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
        placeholder="Send a message"
        ref={textAreaRef}
        autoFocus
      />
      <div className={Style["submit-button"]} onClick={handleClick}>
        <SendIcon sx={{ color: "#6195d1", fontSize: "18px" }} />
      </div>
    </div>
  );
}

export default ChatBotInput;
