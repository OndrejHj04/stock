"use client";
import {
  Card,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../db";
export default function Page({ params: { player } }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("username") === player) {
      getDoc(doc(db, "players", player)).then((doc) => {
        if (!doc.exists()) {
          router.push("/");
        } else {
          setLoading(false);
          setData(doc.data());
        }
      });
    } else {
      router.push("/");
    }

    getDocs(collection(db, "items")).then((doc) => {
      const items = [];
      doc.forEach((d) => items.push(d.data()));
      setItems(items);
    });
  }, []);
  console.log(data)
  return (
    <div className="flex-1 flex justify-center items-center">
      <Paper className="p-3 flex flex-col gap-3">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4">Vítej, {player}!</Typography>
            <Card>
              
            </Card>
          </>
        )}
      </Paper>
    </div>
  );
}
