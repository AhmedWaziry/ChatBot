import React, { useState } from "react";
import ChatBotNav2 from "./ChatBotNav2";
import ChatBot2 from "./ChatBot2";
import "./ChatBotPage2.css";

export default function ChatBotPage2({ isClosed, id }) {
  const [chatMessages, setChatMessages] = useState([
    { message: "Hi, I'm Usual.chat How can I help you ?", isUser: false },
  ]);
  const onRefrash = () => {
    setChatMessages([
      { message: "Hi, I'm Usual.chat How can I help you ?", isUser: false },
    ]);
  };
  return (
    <div className="chat-page">
      <ChatBotNav2 isClosed={isClosed} onRefrash={onRefrash} />
      <ChatBot2
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        id={id}
      />
    </div>
  );
}
