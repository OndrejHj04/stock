"use client";
import { Typography } from "@mui/material";
import React from "react";

function Page({ params: { item } }) {
  return (
    <div>
      <Typography variant="h4">{item}</Typography>
    </div>
  );
}
export default Page;
