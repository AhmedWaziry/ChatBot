import { useEffect } from "react";

import "./App.css";
import Extension from "./components/Extension";

function App() {
  let id = "";
  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/AhmedWaziry/ChatBot@main/dist/assets/chatbot"]'
    );
    id = scriptTag.getAttribute("id");
  }, []);
  return (
    <div className="App">
      <Extension id={id} />
    </div>
  );
}

export default App;
