import { useEffect, useState } from "react";

import Extension from "./components/Extension";
import Style from "./AppChat.module.css";

function AppChat() {
  const [id, setId] = useState("fbc8ccd5-181c-4f7d-826c-d5ce44d8859b");

  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://staging.usual.chat/chat_extension_01.js"]'
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
