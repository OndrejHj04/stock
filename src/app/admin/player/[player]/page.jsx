"use client";
import { CircularProgress, Paper, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../db";
import { useRouter } from "next/navigation";
export default function Player({ params: { player } }) {
  const [data, setData] = useState(null);
  const [items, setItems] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getDoc(doc(db, "players", player)).then((doc) => {
      if (doc.exists()) {
        setData(doc.data());
      } else {
        router.push("/admin");
      }
    });
    getDocs(collection(db, "items")).then((data) => {
      const array = [];
      array.push(...data.docs.map((doc) => doc.data()));
      setItems(array);
    })
  }, []);
  return (
    <Paper className="flex flex-col gap-2 p-2">
      {!data ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <Typography variant="h4" className="text-center">
            Jméno: {player}
          </Typography>
          <Typography variant="h5">Inventář:</Typography>
          <div className="flex flex-col">
            {data.inventory.map(({ count, label, id, price }, i) => (
              <div key={i} className="flex items-center gap-3">
                <Typography className="mr-auto" variant="h6">
                  {label}
                </Typography>
                <Typography>Datum: xxx</Typography>
                <Typography>POČET: {count}</Typography>
                <Typography>Pořizovací cena: {price}</Typography>
                <Typography>Aktuální cena: {price}</Typography>
              </div>
            ))}
          </div>
        </>
      )}
    </Paper>
  );
}
