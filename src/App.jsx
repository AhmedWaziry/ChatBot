import { useEffect, useState } from "react";

import "./App.css";
import Extension from "./components/Extension";

function App() {
  const [ID, setID] = useState("");
  console.log(ID);
  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chatbot3.js"]'
    );

    setID(scriptTag.getAttribute("id"));
  }, []);
  return (
    <div className="App">
      <Extension id={ID} />
    </div>
  );
}

export default App;
