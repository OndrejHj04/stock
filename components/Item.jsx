"use client";

import { Typography } from "@mui/material";
import Image from "next/image";

export const Item = ({ item }) => {
  return (
    <div style={{ border: "2px solid red" }} className="p-4">
      <Image src={`/${item}.png`} width="100" height="100" alt={item} />
      <Typography className="text-center">{item}</Typography>
    </div>
  );
};
