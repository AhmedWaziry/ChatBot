import React, { useState, useEffect } from "react";
import ChatBotNav from "./ChatBotNav";
import ChatBot from "./ChatBot";
import Style from "./ChatBotPage.module.css";
import SpinnerLoader from "./utils/SpinnerLoader";
import BASE_URL from "../config";

export default function ChatBotPage({ isClosed, id }) {
  const [refrash, setRefrash] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { message: "", isUser: false },
  ]);
  const onRefrash = () => {
    setRefrash((prev) => !prev);
  };

  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [messageDialog, setMessageDialog] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const domainName = window.location.hostname;

    const url = `${BASE_URL}/chatbot/check_privacy/${id}/`;
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
      className={Style["chat-page"]}
      style={{ height: openPrivacy ? "15vh" : "80vh" }}
    >
      {loadingPage ? (
        <SpinnerLoader />
      ) : openPrivacy ? (
        <div className={Style["failed"]}>{messageDialog}</div>
      ) : (
        <>
          <ChatBotNav isClosed={isClosed} onRefrash={onRefrash} />
          <ChatBot
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            id={id}
            refrash={refrash}
          />
        </>
      )}
    </div>
  );
}
