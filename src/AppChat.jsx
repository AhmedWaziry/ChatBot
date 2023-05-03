import { useEffect, useState } from "react";

import Extension from "./components/Extension";
import Style from "./AppChat.module.css";

function AppChat() {
  const [id, setId] = useState("d599bef0-d75b-4c01-95d9-00f5bc3d3c4d");

  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chat_ahmedgamal3.js"]'
    );

    if (scriptTag) {
      setId(scriptTag.getAttribute("id"));
    }
  }, []);
  return (
    <div className={Style["chat"]}>
      {id !== "" ? <Extension id={id} /> : <></>}
    </div>
  );
}

export default AppChat;
