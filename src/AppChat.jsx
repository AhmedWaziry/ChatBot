import { useEffect, useState } from "react";

import "./AppChat.css";
import Extension from "./components/Extension";

function AppChat() {
  const [id, setId] = useState("8ab0ea44-9542-47af-8d95-3897933debb4");

  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chatpage_ahmedgamal3.js"]'
    );

    if (scriptTag) {
      setId(scriptTag.getAttribute("id"));
    }
  }, []);
  return <div className="App">{id !== "" ? <Extension id={id} /> : <></>}</div>;
}

export default AppChat;
