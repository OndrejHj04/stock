"use client";
import { StyledEngineProvider } from "@mui/material";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
};
