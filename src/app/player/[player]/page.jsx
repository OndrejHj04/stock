"use client";
import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../db";
import moment from "moment";
export default function Page({ params: { player } }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [market, setMarket] = useState([]);
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
      setMarket(items);
    });
  }, []);

  const makePercent = () => {
    const marketPrice = Object.values(data.inventory).reduce(
      (a, b) => a + b.price,
      0
    );

    let updatedPrice = 0;

    Object.values(data.inventory).forEach(({ count, label }) => {
      updatedPrice += market.find((item) => item.label === label).price * count;
    });
    const percent = `${
      Math.round((updatedPrice / marketPrice) * 100 - 100) || "0"
    }%`;

    return (
      <div className="flex-col flex">
        <Typography className="font-bold" variant="h3">
          {updatedPrice} Chc
        </Typography>
        <div className="flex items-center gap-2">
          <Typography className="text-xl">
            +{updatedPrice - marketPrice} Chc
          </Typography>
          <Chip
            color={
              Math.round((updatedPrice / marketPrice) * 100 - 100)
                ? Math.round((updatedPrice / marketPrice) * 100 - 100) >= 0
                  ? "success"
                  : "error"
                : "default"
            }
            label={<Typography>{percent}</Typography>}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <Paper className="p-3 flex flex-col gap-3">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="flex">{makePercent()}</div>
            {market.map((item, i) => {
              const thisItemInUserInventory = data.inventory[item.label];

              const marketPrice = thisItemInUserInventory.price;
              const updatedPrice = item.price * thisItemInUserInventory.count;

              const percent = `${
                Math.round((updatedPrice / marketPrice) * 100 - 100) || "0"
              }%`;

              return (
                <Card className="flex gap-2 p-2 items-center" key={i}>
                  <Typography variant="h6">{item.label}</Typography>
                  <Typography>CENA: {item.price},-</Typography>
                  <Typography>
                    POČET: {thisItemInUserInventory.count}
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
                    label={<Typography>{percent}</Typography>}
                  />
                </Card>
              );
            })}
          </>
        )}
      </Paper>
    </div>
  );
}
