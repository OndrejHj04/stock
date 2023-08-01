"use client";

import { Pagination } from "@mui/material";

export default function layout({ children }) {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex justify-center items-center flex-1">{children}</div>
      <Pagination count={4} className="mx-auto my-3" />
    </div>
  );
}
