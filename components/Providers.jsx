"use client";
import { StyledEngineProvider } from "@mui/material";
import React from "react";
export const Providers = ({ children }) => {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
};
