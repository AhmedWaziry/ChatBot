import React, { useEffect, useRef, useState } from "react";
import Style from "./ChatBot.module.css";
import bot from "../assets/bot.png";
import sandclock from "../assets/sandclock.png";
import ChatBotInput from "./ChatBotInput";
export const baseURL = "https://api.usual.chat";
//export const baseURL = "http://localhost:8000";

export default function ChatBot({ chatMessages, setChatMessages }) {
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ID, setID] = useState("8ab0ea44-9542-47af-8d95-3897933debb4");
  const [primary_color, setPrimaryColor] = useState("#fd905326");
  const [secondary_color, setSecondaryColor] = useState("#b3b3b31a");
  const [logo, setLogo] = useState(null);

  const handleGetAnswer = async (message) => {
    const url = `${baseURL}/chatbot/chat/${ID}/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        question: message,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.result !== undefined) {
          setChatMessages((prev) => [
            ...prev.slice(0, prev.length - 1),
            { message: data.result, isUser: false },
          ]);
        } else {
          setChatMessages((prev) => [
            ...prev.slice(0, prev.length - 1),
            { message: data, isUser: false },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        setChatMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          { message: "Connection Error", isUser: false },
        ]);
      });
  };

  useEffect(() => {
    const url = `${baseURL}/chatbot/${ID}/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPrimaryColor(res.primary_color);
        setSecondaryColor(res.secondary_color);
        setLogo(res.logo);
        setChatMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          { message: res.welcome_message, isUser: false },
        ]);
      });
  }, []);

  const addMessage = (message, isUser) => {
    setLoading(true);
    setChatMessages((prev) => [...prev, { message: message, isUser: isUser }]);
    setChatMessages((prev) => [...prev, { message: "", isUser: false }]);
    handleGetAnswer(message);
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className={Style["chat"]}>
      <div className={Style["scrolling"]}>
        {chatMessages.map((chatMessage, index) => (
          <div className={Style["chat-messages"]} key={index}>
            {chatMessage.isUser ? (
              <div className={Style["avatar-icon-user"]}>
                <span className={Style["username-color"]}>Y</span>
              </div>
            ) : (
              <div className={Style["avatar-icon-bot"]}>
                <img
                  alt="logo"
                  src={logo === null ? bot : baseURL + logo}
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
            )}
            {chatMessage.isUser ? (
              <div
                className={Style["bubble-message-user"]}
                style={{
                  backgroundColor: primary_color,
                }}
              >
                <span
                  className={Style["text-message"]}
                  style={
                    {
                      // color: primary_color,
                      // filter: "invert(100%)",
                    }
                  }
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
                {loading && index == chatMessages.length - 1 && (
                  <span className={Style["text-message"]}>
                    <img
                      alt="loader"
                      src={sandclock}
                      className={Style["loading-img"]}
                    ></img>
                  </span>
                )}
                <span
                  className={Style["text-message"]}
                  style={
                    {
                      // color: secondary_color,
                      // filter: "invert(100%)",
                    }
                  }
                >
                  {chatMessage.message}
                </span>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatBotInput addMessage={addMessage} primary_color={primary_color} />
    </div>
  );
}
