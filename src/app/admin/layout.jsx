"use client";

import { Pagination } from "@mui/material";

export default function layout({ children }) {
  return (
    <div className="h-screen w-full flex flex-col items-center py-10">
      <div className="flex-1">{children}</div>
      <Pagination count={4} />
    </div>
  );
}
