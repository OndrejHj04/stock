"use client";
import { StyledEngineProvider } from "@mui/material";

export const Providers = ({ children }) => {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
};
