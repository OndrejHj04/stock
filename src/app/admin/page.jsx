"use client";
import React from "react";
import { Pagination, Paper } from "@mui/material";
import Inventory from "./slides/Inventory";
import { useState } from "react";
import AddPlayer from "./slides/AddPlayer";

export default function Admin() {
  const [pagination, setPagination] = useState(1);
  return (
    <>
      <div className="flex justify-center items-center flex-1">
        <Paper className="p-3 max-w-md mx-auto flex flex-col gap-2 items-center">
          {pagination === 1 && <Inventory />}
          {pagination === 2 && <AddPlayer />}
        </Paper>
      </div>

      <Pagination
        page={pagination}
        count={4}
        className="mx-auto my-3"
        onChange={(_, number) => setPagination(number)}
      />
    </>
  );
}
