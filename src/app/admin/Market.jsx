"use client";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../db";
import { useRouter } from "next/navigation";
import moment from "moment";

export default function Market() {
  const [market, setMarket] = useState(null);
  const navigation = useRouter();
  useEffect(() => {
    onSnapshot(collection(db, "items"), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => users.push(doc.data()));
      return setMarket(users);
    });
  }, []);
  return (
    <Paper className="flex flex-col gap-2 p-2">
      <Typography variant="h4" className="text-center">
        Předměty na burze
      </Typography>
      <div className="flex">
        {Array.isArray(market) ? (
          <>
            {market.length ? (
              <div
                className="flex flex-col overflow-scroll gap-1.5"
                style={{ maxHeight: "400px" }}
              >
                {market.map(({ label, price, history }, i) => {
                  const graphData = [
                    history.reduce((prev, curr) =>
                      prev.price < curr.price ? prev : curr
                    ).price,
                    history.reduce((prev, curr) =>
                      prev.price > curr.price ? prev : curr
                    ).price,
                  ];
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Typography className="mr-auto" variant="h6">
                        {label}
                      </Typography>
                      <Typography>MIN: {graphData[0]},-</Typography>
                      <Typography>MAX: {graphData[1]},-</Typography>
                      <Typography>CENA: {price},-</Typography>
                      <Typography>LAST CHANGE: {moment(history[history.length-1].timestamp).format("MM.DD. HH:mm")}</Typography>
                      <Button
                        variant="outlined"
                        onClick={() => navigation.push(`/admin/item/${label}`)}
                      >
                        Detail
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Typography className="m-auto">
                Žádní uživatelé k zobrazení
              </Typography>
            )}
          </>
        ) : (
          <CircularProgress className="m-auto" />
        )}
      </div>
    </Paper>
  );
}
