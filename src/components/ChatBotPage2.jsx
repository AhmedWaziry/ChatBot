import React, { useState, useEffect } from "react";
import ChatBotNav2 from "./ChatBotNav2";
import ChatBot2 from "./ChatBot2";
import "./ChatBotPage2.css";
import SpinnerLoader from "./SpinnerLoader";
import PrivacyPopup from "./PrivacyPopup";
export const baseURL = "http://localhost:8000";
//export const baseURL = "https://api.usual.chat";
//export const baseURL = "https://staging.api.usual.chat";

export default function ChatBotPage2({ isClosed, id }) {
  const [chatMessages, setChatMessages] = useState([
    { message: "Hi, I'm Usual.chat How can I help you ?", isUser: false },
  ]);
  const onRefrash = () => {
    setChatMessages([
      { message: "Hi, I'm Usual.chat How can I help you ?", isUser: false },
    ]);
  };

  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [messageDialog, setMessageDialog] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const domainName = window.location.hostname;

    const url = `${baseURL}/chatbot/check_privacy/${id}/${domainName}/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setLoadingPage(false);
        if (res.status >= 400) {
          if (res.status === 404)
            setMessageDialog("Oops! The Chatbot is under mainataining");
          else if (res.status === 401)
            setMessageDialog(
              "This Chatbot is private. Please contact the owner to get access."
            );
          else setMessageDialog("Something went wrong");
          setLoadingPage(false);
          setOpenPrivacy(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 404)
          setMessageDialog("Oops! The Chatbot is under mainataining");
        else if (error.response.status === 401)
          setMessageDialog(
            "This Chatbot is private. Please contact the owner to get access."
          );
        else setMessageDialog("Something went wrong");
        setLoadingPage(false);
        setOpenPrivacy(true);
      });
  }, []);

  return (
    <div
      className="chat-page"
      style={{ height: openPrivacy ? "15vh" : "80vh" }}
    >
      {loadingPage ? (
        <SpinnerLoader />
      ) : openPrivacy ? (
        <div className="failed">{messageDialog}</div>
      ) : (
        <>
          <ChatBotNav2 isClosed={isClosed} onRefrash={onRefrash} />
          <ChatBot2
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            id={id}
          />
        </>
      )}
    </div>
  );
}
