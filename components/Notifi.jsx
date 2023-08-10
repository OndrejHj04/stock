import React from "react";
import { Button } from "@mui/material";
import addNotification from "react-push-notification";
export default function Notifi() {
  const handleClick = () => {
    addNotification({
      title: "Warning",
      message: "This is a very long message",
      duration: 4000,
      icon: "/check.png",
      native: true,
    }).then((res) => console.log(res));
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        notifi
      </Button>
    </div>
  );
}
