import { useEffect, useState } from "react";

import "./App.css";
import Extension from "./components/Extension";

function App() {
  const [id, setId] = useState("8ab0ea44-9542-47af-8d95-3897933debb4");

  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chatbotpage.js"]'
    );

    if (scriptTag) {
      console.log(scriptTag);
      setId(scriptTag.getAttribute("id"));
    }
  }, []);
  return <div className="App">{id !== "" ? <Extension id={id} /> : <></>}</div>;
}

export default App;
