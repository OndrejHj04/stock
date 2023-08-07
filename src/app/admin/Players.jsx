"use client";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../db";
import NewPlayerInput from "../../../components/NewPlayerInput";
import { useRouter } from "next/navigation";

export default function Players() {
  const [data, setData] = useState(null);
  const [market, setMarket] = useState(null);
  const navigation = useRouter();
  useEffect(() => {
    onSnapshot(collection(db, "players"), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => users.push(doc.data()));
      return setData(users);
    });

    getDocs(collection(db, "items")).then((market) => {
      const marketData = [];
      market.forEach((doc) => marketData.push(doc.data()));
      setMarket(marketData);
    });
  }, []);
  return (
    <Paper className="flex flex-col gap-2 p-2">
      <Typography variant="h4" className="text-center">
        List Hráčů
      </Typography>
      <NewPlayerInput />
      <div className="flex">
        {Array.isArray(data) ? (
          <>
            {data.length ? (
              <div
                className="flex flex-col overflow-scroll gap-1.5"
                style={{ maxHeight: "400px" }}
              >
                {data.map(({ name, inventory }, i) => {
                  const inventoryStats = [
                    inventory.reduce((prev, curr) => prev + curr.count, 0),
                    inventory.reduce(
                      (prev, curr) => prev + curr.price * curr.count,
                      0
                    ),
                  ];
                  let updatedPrice = 0;
                  inventory.map(({ id, count }) => {
                    const item = market.find((item) => item.id === id);
                    updatedPrice += item.price * count;
                  });

                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Typography className="mr-auto" variant="h6">
                        {name}
                      </Typography>
                      <Typography>
                        POČET PŘEDMĚTŮ: {inventoryStats[0]},-
                      </Typography>
                      <Typography>
                        NÁKUPNÍ CENA: {inventoryStats[1]},-
                      </Typography>
                      <Typography>
                        AKTUÁLNÍ HODNOTA: {updatedPrice},-
                      </Typography>
                      <Typography>
                        plus/minus {updatedPrice - inventoryStats[1]},-
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => navigation.push(`/admin/player/${name}`)}
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
