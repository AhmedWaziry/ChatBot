import React, { useEffect, useRef, useState } from "react";
import Style from "./ChatBot2.module.css";

import ChatBotInput2 from "./ChatBotInput2";
import { hexToRgb, calculateLuma } from "./HelperFunctions.jsx";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LoopIcon from "@mui/icons-material/Loop";
import LaunchIcon from "@mui/icons-material/Launch";
//export const baseURL = "http://localhost:8000";
export const baseURL = "https://api.usual.chat";

function getDomainFromURL(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
}
function getUrlsFromString(sources, answer) {
  // convert sources list of JSON object string to dic object
  const sourcesDic = JSON.parse(sources);
  console.log(sourcesDic);
  let links = [];
  for (let i = 0; i < sourcesDic.length; i++) {
    links.push(
      <a
        href={sourcesDic[i].url}
        target="_blank"
        className={Style["link"]}
        key={i}
      >
        {getDomainFromURL(sourcesDic[i].url)}
        <LaunchIcon sx={{ fontSize: "20px", marginLeft: 0.2 }} />
      </a>
    );
  }

  return links;
}

export default function ChatBot2({ chatMessages, setChatMessages, id }) {
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [primary_color, setPrimaryColor] = useState("#fd905326");
  const [secondary_color, setSecondaryColor] = useState("#b3b3b31a");
  const [primaryTextColor, setPrimaryTextColor] = useState("black");
  const [secondaryTextColor, setSecondaryTextColor] = useState("black");
  const [logo, setLogo] = useState(null);

  const getTextColor = () => {
    // turn hex color to rgb
    const rgb1 = hexToRgb(primary_color);
    // calculate the perceptive luminance (aka luma) - human eye favors green color...
    const luma1 = calculateLuma(rgb1);
    // turn hex color to rgb
    const rgb2 = hexToRgb(secondary_color);
    // calculate the perceptive luminance (aka luma) - human eye favors green color...
    const luma2 = calculateLuma(rgb2);
    if (luma1 > 0.5) {
      setPrimaryTextColor("black");
    } else {
      setPrimaryTextColor("white");
    }
    if (luma2 > 0.5) {
      setSecondaryTextColor("black");
    } else {
      setSecondaryTextColor("white");
    }
  };
  useEffect(() => {
    getTextColor();
  }, [primary_color, secondary_color]);

  const handleGetAnswer = async (message) => {
    const url = `${baseURL}/chatbot/chat/${id}/`;
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
            { message: data.result, isUser: false, sources: data.sources },
          ]);
        } else {
          setChatMessages((prev) => [
            ...prev.slice(0, prev.length - 1),
            { message: data, isUser: false, sources: "" },
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
    const url = `${baseURL}/chatbot/${id}/`;
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
          {
            message: res.welcome_message,
            isUser: false,
            sources: "",
          },
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
    bottomRef.current?.scrollIntoView();
  }, [chatMessages]);

  return (
    <div className={Style["chat"]}>
      {console.log(chatMessages)}
      <div className={Style["scrolling"]}>
        {chatMessages.map((chatMessage, index) => (
          <div className={Style["chat-messages"]} key={index}>
            {chatMessage.isUser ? (
              <div className={Style["avatar-icon-user"]}></div>
            ) : (
              <div className={Style["avatar-icon-bot"]}>
                {logo === null ? (
                  <SmartToyIcon />
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
                  style={{
                    color: primaryTextColor,
                    whiteSpace: "pre-wrap",
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
                {loading && index == chatMessages.length - 1 && (
                  <span className={Style["text-message"]}>
                    <span className={Style["loading-img"]}>
                      <LoopIcon />
                    </span>
                  </span>
                )}
                <div className={Style["text-message"]}>
                  <span
                    style={{
                      color: secondaryTextColor,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {chatMessage.message.includes("(Source:")
                      ? chatMessage.message.replace(/ \(Source: .+?\)/g, "")
                      : chatMessage.message}
                  </span>
                </div>

                {chatMessage.message.includes("(Source:") ||
                (chatMessage.sources &&
                  chatMessage.sources !== "" &&
                  chatMessage.sources.includes("http")) ? (
                  <div className={Style["text-sources"]}>
                    <span className={Style["learn"]}>Learn more:</span>
                    <div className={Style["sources"]}>
                      {getUrlsFromString(
                        chatMessage.sources,
                        chatMessage.message
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatBotInput2
        addMessage={addMessage}
        primary_color={primary_color}
        loading={loading}
      />
    </div>
  );
}
