"use client";
import { CircularProgress, Paper, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../db";
export default function Page({ params: { player } }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("username") === player) {
      getDoc(doc(db, "players", player)).then((doc) => {
        if (!doc.exists()) {
          router.push("/");
        } else {
          setLoading(false);
        }
      });
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex-1 flex justify-center items-center">
      <Paper className="p-3 flex flex-col gap-3">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4">{player}</Typography>
          </>
        )}
      </Paper>
    </div>
  );
}
