import React from "react";
import ReactDOM from "react-dom";
import AppChat from "./AppChat";
const element = document.createElement("dev");
element.setAttribute("id", "usualchat-ahmed");
document.body.appendChild(element);

ReactDOM.render(<AppChat />, document.getElementById("usualchat-ahmed"));
