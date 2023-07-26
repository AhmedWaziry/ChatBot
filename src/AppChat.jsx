import { useEffect, useState } from "react";

import Extension from "./components/Extension";
import Style from "./AppChat.module.css";

function AppChat() {
  const [id, setId] = useState("c55f2119-d081-4b66-aa26-d10a7ca92175");

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
