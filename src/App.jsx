import { useEffect, useState } from "react";

import "./App.css";
import Extension from "./components/Extension";

function App() {
  const [ID, setID] = useState("");
  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chatbot.js"]'
    );
    console.log(scriptTag);
    setID(scriptTag.getAttribute("id"));
  }, []);
  return (
    <div className="App">
      <Extension id={scriptTag} />
    </div>
  );
}

export default App;
