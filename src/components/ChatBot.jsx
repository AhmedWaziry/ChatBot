import React, { useEffect, useRef, useState } from "react";
import Style from "./ChatBot.module.css";

import ChatBotInput from "./utils/ChatBotInput";
import { hexToRgb, calculateLuma } from "./utils/HelperFunctions.jsx";
import BASE_URL from "../config";
import Message from "./utils/Message";
import SpinnerLoader from "./utils/SpinnerLoader";

function ChatBot({ id, chatMessages, setChatMessages, refrash }) {
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [primary_color, setPrimaryColor] = useState("#6195d126");
  const [secondary_color, setSecondaryColor] = useState("#b3b3b31a");
  const [logo, setLogo] = useState(null);
  const [disable, setDisable] = useState(false);
  const [primaryTextColor, setPrimaryTextColor] = useState("black");
  const [secondaryTextColor, setSecondaryTextColor] = useState("black");

  const [stream, setStream] = useState({
    message: "",
    isUser: false,
    sources: "",
  });

  const getTextColor = () => {
    // turn hex color to rgb
    const rgb1 = hexToRgb(primary_color);
    // calculate the perceptive luminance (aka luma) - human eye favors green color...
    const luma1 = calculateLuma(rgb1);
    // turn hex color to rgb
    const rgb2 = hexToRgb(secondary_color);
    // calculate the perceptive luminance (aka luma) - human eye favors green color...
    const luma2 = calculateLuma(rgb2);
    if (luma1 > 0.6) {
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
    new ReadableStream({
      start(controller) {
        const fetchData = async () => {
          try {
            const response = await fetch(`${BASE_URL}/chatbot/chat/${id}/`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json", // Set Content-Type header to indicate JSON format
                Authorization: localStorage.getItem("access_token")
                  ? "JWT " + localStorage.getItem("access_token")
                  : null,
              },
              body: JSON.stringify({ question: message }), // Convert body object to JSON string
            });

            const reader = response.body.getReader();
            let start_url = false;
            let http_check = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setStream((prev) => {
                  return {
                    ...prev,
                    message: prev.message + "]",
                  };
                });
                break;
              }
              setLoading(false);
              const text = new TextDecoder().decode(value);
              for (const char of text) {
                controller.enqueue(char);

                if (char == "[" || char == "(") continue;
                if (char == "h" && !http_check.startsWith("http")) {
                  start_url = true;
                  http_check = "";
                }
                if (!start_url && char == "]") continue;
                if (start_url) {
                  http_check += char;
                  if (
                    http_check.length < 4 &&
                    http_check[http_check.length - 1] !==
                      "http"[http_check.length - 1]
                  ) {
                    start_url = false;
                    http_check = "";
                  }
                  if (http_check.startsWith("http")) {
                    if (http_check.length === 4) {
                      setStream((prev) => {
                        let current = prev.message.toString();
                        current = current.slice(-4);
                        if (current[0] !== " ") {
                          return {
                            ...prev,
                            message:
                              prev.message.slice(0, -3) +
                              " " +
                              prev.message.slice(-3),
                          };
                        } else {
                          return {
                            ...prev,
                          };
                        }
                      });
                    }
                    if (
                      char == " " ||
                      char == "\n" ||
                      char == "\r" ||
                      char == "]" ||
                      char == ")" ||
                      char == ","
                    ) {
                      start_url = false;
                      http_check = "";
                      setStream((prev) => {
                        return {
                          ...prev,
                          message: prev.message + "] ",
                        };
                      });
                      if (char == "]" || char == ")") continue;
                    }
                  }
                  if (
                    http_check.length == 4 &&
                    !http_check.startsWith("http")
                  ) {
                    start_url = false;
                    http_check = "";
                  }
                }
                setStream((prev) => {
                  return {
                    ...prev,
                    message: prev.message + char,
                  };
                });
              }
            }
          } catch (error) {
            controller.error(error);
            setLoading(false);
          } finally {
            setLoading(false);
            setDisable(false);
            controller.close();
          }
        };
        fetchData();
      },
    });
  };

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}/`;
    setLoadingPage(true);
    setStream({
      message: "",
      isUser: false,
      sources: "",
    });
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
        setChatMessages([
          {
            message: res.welcome_message,
            isUser: false,
            sources: "",
          },
        ]);
      })
      .then(() => {
        setLoadingPage(false);
      });
  }, [refrash]);

  const addMessage = (message, isUser) => {
    if (loading) return;
    if (stream.message != "") setChatMessages((prev) => [...prev, stream]);

    setChatMessages((prev) => [
      ...prev,
      { message: message, isUser: isUser, sources: "" },
    ]);

    setStream({ message: "", isUser: false, sources: "" });
    setLoading(true);
    setDisable(true);
    handleGetAnswer(message);
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change

    const container = bottomRef.current;
    if (container != null) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages, stream]);

  return (
    <>
      {loadingPage ? (
        <SpinnerLoader />
      ) : (
        <>
          <div className={Style["chat"]}>
            <div className={Style["scrolling"]} ref={bottomRef}>
              {chatMessages.map((chatMessage, index) => (
                <Message
                  chatMessages={chatMessages}
                  chatMessage={chatMessage}
                  index={index}
                  logo={logo}
                  secondaryTextColor={secondaryTextColor}
                  primaryTextColor={primaryTextColor}
                  key={index}
                  primary_color={primary_color}
                  secondary_color={secondary_color}
                />
              ))}
              {loading || stream.message != "" ? (
                <Message
                  chatMessages={chatMessages}
                  chatMessage={stream}
                  index={chatMessages.length}
                  key={chatMessages.length + 100}
                  logo={logo}
                  secondaryTextColor={secondaryTextColor}
                  primaryTextColor={primaryTextColor}
                  primary_color={primary_color}
                  secondary_color={secondary_color}
                  loading={loading}
                />
              ) : (
                <></>
              )}
            </div>
            <ChatBotInput
              addMessage={addMessage}
              primary_color={primary_color}
              secondary_color={secondary_color}
              loading={loading}
              disable={disable}
            />
            <span
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                color: "#ADADAD",
              }}
            >
              Powered by&nbsp;
              <span
                style={{
                  color: "#2F2F7F",
                }}
              >
                Usual.chat
              </span>
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default ChatBot;
