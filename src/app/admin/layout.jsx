import { Typography } from "@mui/material";
import React from "react";

export default function Layout({ children }) {
  return <div className="w-full h-screen flex justify-center items-center">{children}</div>;
}
