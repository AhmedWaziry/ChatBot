import React from "react";

import Style from "./Message.module.css";
import Loader from "react-js-loader";

function Message({
  chatMessage,
  index,
  logo,
  primaryTextColor,
  secondaryTextColor,
  secondary_color,
  primary_color,
  loading,
  chatMessages,
}) {
  function renderMessageWithLinks(message) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlRegex);
    const renderedParts = parts.map((part, index) => {
      if (index % 2 === 1) {
        if (part.endsWith("]") || part.endsWith(")") || part.endsWith(" ")) {
          part = part.slice(0, -1);
          return (
            <a key={index} href={part} target="_blank">
              Link
            </a>
          );
        } else {
          return (
            <a key={index} href={part} target="_blank">
              {part}
            </a>
          );
        }
      }
      if (part.endsWith("]")) part = part.slice(0, -1);
      return part;
    });
    return renderedParts;
  }
  return (
    <div
      className={Style["chat-messages"]}
      key={index}
      style={{ justifyContent: chatMessage.isUser ? "flex-end" : "flex-start" }}
    >
      {chatMessage.isUser ? (
        <div
          className={Style["bubble-message-user"]}
          style={{
            backgroundColor: primary_color,
          }}
        >
          <span
            className={Style["text-message"]}
            style={{
              color: primaryTextColor,
              whiteSpace: "pre-wrap",
              // filter: "invert(100%)",
            }}
          >
            {chatMessage.message}
          </span>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: secondary_color,
          }}
          className={Style["bubble-message-bot"]}
        >
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "55px",
                maxHeight: "18px",
              }}
            >
              <Loader
                type="bubble-loop"
                bgColor={"black"}
                color={"white"}
                size={40}
              />
            </div>
          )}

          <div className={Style["text-message"]}>
            <span
              style={{
                color: secondaryTextColor,
                whiteSpace: "pre-wrap",
              }}
            >
              {renderMessageWithLinks(chatMessage.message)}
            </span>
          </div>

          {chatMessage.message.includes("(Source:") ||
          (chatMessage.sources &&
            chatMessage.sources !== "" &&
            chatMessage.sources.includes("http")) ? (
            <div className={Style["text-sources"]}>
              <span className={Style["learn"]}>Learn more:</span>
              <div className={Style["sources"]}>
                {getUrlsFromString(chatMessage.sources, chatMessage.message)}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default Message;
