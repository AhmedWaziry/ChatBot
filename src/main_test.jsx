import React from "react";
import ReactDOM from "react-dom";
import AppChat from "./AppChat";
const element = document.createElement("div");
element.setAttribute("id", "usualchat-extension");
document.body.appendChild(element);

ReactDOM.render(<AppChat />, document.getElementById("usualchat-extension"));
