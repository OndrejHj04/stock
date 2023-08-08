import React from "react";
import { Button } from "@mui/material";
import addNotification from 'react-push-notification';

export default function Notifi() {
  const handleClick = () => {
    addNotification({
      title: "Warning",
      subtitle: "This is a subtitle",
      message: "This is a very long message",
      theme: "darkblue",
      native: true, // when using native, your OS will handle theming.
    });
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        notifi
      </Button>
    </div>
  );
}
