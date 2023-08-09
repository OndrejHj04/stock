"use client";
import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Players from "./Players";
import Market from "./Market";
import Dashboard from "./Dashboard";
import { useRouter } from "next/navigation";

export default function Page() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      {loading ? (
        <CircularProgress className="m-auto"/>
      ) : (
        <>
          <div className="flex-1 flex justify-center items-center">
            {page === 1 && <Dashboard />}
            {page === 2 && <Players />}
            {page === 3 && <Market />}
          </div>
          <div className="mx-auto my-3">
            <Pagination
              count={3}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
            />
          </div>
        </>
      )}
    </div>
  );
}
