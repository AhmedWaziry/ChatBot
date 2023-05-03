import { useEffect, useState } from "react";

import "./App.css";
import Extension from "./components/Extension";

function App() {
  const [id, setId] = useState("");
  console.log(id);
  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chatbot4.js"]'
    );

    if (scriptTag) {
      console.log(scriptTag);
      setId(scriptTag.getAttribute("id"));
    }
  }, []);
  return (
    <div className="App">
      <Extension id={id} />
    </div>
  );
}

export default App;
