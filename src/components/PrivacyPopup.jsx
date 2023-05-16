import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Style from "./DeleteChatBotCard.module.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function PrivacyPopup({ open, setOpen, message }) {
  const handleClose = () => {
    setOpen(0);
  };
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{
        backgroundColor: "#fff",
      }}
      PaperProps={{
        style: {
          borderRadius: 10,
          padding: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <DialogContent>
        <DialogContentText
          sx={{
            display: "flex",
            fontFamily: "Inter",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#404e6a",
          }}
        >
          <span>{message}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <button
          className={Style["delete-button"]}
          onClick={() => {
            handleClose();
          }}
        >
          Ok
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default PrivacyPopup;
