import React, { useEffect } from "react";
import { Button } from "@mui/material";

export default function Notifi() {
  const handleClick = () => {
    new Notification("Hey");
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        notifi
      </Button>
    </div>
  );
}
