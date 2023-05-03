import React, { useState } from "react";
import ChatBotNav from "./ChatBotNav";
import ChatBot from "./ChatBot";
import "./ChatBotPage.css";

export default function ChatBotPage({ isClosed }) {
  const [chatMessages, setChatMessages] = useState([
    { message: "Hi, I'm Usual.chat How can I help you ?", isUser: false },
  ]);
  const onRefrash = () => {
    console.log(chatMessages);
    setChatMessages([
      { message: "Hi, I'm Usual.chat How can I help you ?", isUser: false },
    ]);
  };
  return (
    <div className="chat-page">
      <ChatBotNav isClosed={isClosed} onRefrash={onRefrash} />
      <ChatBot chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}
