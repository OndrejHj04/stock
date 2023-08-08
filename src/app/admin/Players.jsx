"use client";
import {
  Button,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
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
            {data.length && market ? (
              <div
                className="flex flex-col overflow-scroll gap-1.5"
                style={{ maxHeight: "400px" }}
              >
                {data.map(({ name, inventory }, i) => {
                  const totalCount = Object.values(inventory).reduce(
                    (a, b) => a + b.count,
                    0
                  );
                  const marketPrice = Object.values(inventory).reduce(
                    (a, b) => a + b.price,
                    0
                  );
                  let updatedPrice = 0;

                  Object.values(inventory).forEach(({ count, label }) => {
                    updatedPrice +=
                      market.find((item) => item.label === label).price * count;
                  });

                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Typography className="mr-auto" variant="h6">
                        {name}
                      </Typography>
                      <Chip
                        color={
                          Math.round((updatedPrice / marketPrice) * 100 - 100)
                            ? Math.round(
                                (updatedPrice / marketPrice) * 100 - 100
                              ) >= 0
                              ? "success"
                              : "error"
                            : "default"
                        }
                        label={`${
                          Math.round(
                            (updatedPrice / marketPrice) * 100 - 100
                          ) || "0"
                        }%`}
                      />
                      <Typography>POČET PŘEDMĚTŮ: {totalCount}</Typography>
                      <Typography>
                        AKTUÁLNÍ HODNOTA: {updatedPrice},-
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
