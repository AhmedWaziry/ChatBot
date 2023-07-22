import React, { useEffect, useRef, useState } from "react";
import Style from "./ChatBot2.module.css";

import ChatBotInput2 from "./ChatBotInput2";
import { hexToRgb, calculateLuma } from "./HelperFunctions.jsx";
export const baseURL = "http://localhost:8000";
//export const baseURL = "https://api.usual.chat";
//export const baseURL = "https://staging.api.usual.chat";
import Message from "./Message";

function ChatBot2({ id }) {
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [primary_color, setPrimaryColor] = useState("#6195d126");
  const [secondary_color, setSecondaryColor] = useState("#b3b3b31a");
  const [logo, setLogo] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [disable, setDisable] = useState(false);
  const [primaryTextColor, setPrimaryTextColor] = useState("black");
  const [secondaryTextColor, setSecondaryTextColor] = useState("black");
  const [chatMessagesLength, setChatMessagesLength] = useState(1);
  const [temp, setTemp] = useState("");
  // const [isError, setIsError] = useState({ isError: false, errorMessage: "" });
  let firstTime = 0;

  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hi, I'm Usual.chat How can I help you ?",
      isUser: false,
      sources: "",
    },
  ]);

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
            // const response = await fetch("http://localhost:8000/stream");
            // console.log(response);

            const response = await fetch(`${baseURL}/chatbot/chat/${id}/`, {
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
            console.log(response.body);
            const reader = response.body.getReader();
            // const response = await apis.getAnswer(message, id);
            // console.log(response);
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
                console.log(start_url, char);
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
                      // console.log(http_check, char);
                      // console.log(stream.message);
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
            setEnabled(true);
            setDisable(false);
            controller.close();
          }
        };

        fetchData();
      },
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
    setChatMessagesLength((prev) => prev + 1);
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
    container.scrollTop = container.scrollHeight;
  }, [chatMessages, stream]);

  return loadingPage ? (
    <SpinnerLoader height="73px" />
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
        <ChatBotInput2
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
  );
}

export default ChatBot2;
