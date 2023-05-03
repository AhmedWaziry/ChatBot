import React from "react";
import Style from "./ChatBotNav.module.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";

function ChatBotNav({ isClosed, onRefrash }) {
  return (
    <div className={Style["nav"]}>
      <div className={Style["usaul-chat-txt"]}>
        <span
          style={{
            cursor: "pointer",
            color: "black",
          }}
          onClick={() => {}}
        >
          Usual.
          <span
            style={{
              color: "#FD9053",
            }}
          >
            Chat
          </span>
        </span>
      </div>
      <div className={Style["icons"]}>
        <RefreshIcon
          sx={{ marginRight: 1, "&:hover": { cursor: "pointer" } }}
          onClick={onRefrash}
        />
        <CloseIcon
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={isClosed}
        />
      </div>
    </div>
  );
}

export default ChatBotNav;
