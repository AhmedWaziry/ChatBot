import { useEffect, useState } from "react";

import "./App.css";
import Extension from "./components/Extension";

function App() {
  const [id, setId] = useState("");

  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chatpage_ahmedGamal.js"]'
    );

    if (scriptTag) {
      setId(scriptTag.getAttribute("id"));
    }
  }, []);
  return <div className="App">{id !== "" ? <Extension id={id} /> : <></>}</div>;
}

export default App;
