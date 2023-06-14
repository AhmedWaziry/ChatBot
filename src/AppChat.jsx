import { useEffect, useState } from "react";

import Extension from "./components/Extension";
import Style from "./AppChat.module.css";

function AppChat() {
  const [id, setId] = useState("");

  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chat_extension_01.js"]'
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
