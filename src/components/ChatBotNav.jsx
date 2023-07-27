import React from "react";
import Style from "./ChatBotNav.module.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";

function ChatBotNav({ isClosed, onRefrash }) {
  return (
    <div className={Style["nav"]}>
      <div className={Style["usaul-chat-txt"]}>
        <span>Usual.Chat</span>
      </div>
      <div className={Style["icons"]}>
        <RefreshIcon
          sx={{
            marginRight: 1,
            "&:hover": { cursor: "pointer" },
            fontSize: 20,
          }}
          onClick={onRefrash}
        />
        <CloseIcon
          sx={{ "&:hover": { cursor: "pointer" }, fontSize: 20 }}
          onClick={isClosed}
        />
      </div>
    </div>
  );
}

export default ChatBotNav;
