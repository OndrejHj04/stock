"use client";
import {
  Avatar,
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
import { PieChart } from "@mui/x-charts";
import moment from "moment";
export default function Page({ params: { player } }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ inventory: {} });
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

  const calculate = () => {
    const marketPrice = Object.values(data.inventory).reduce(
      (a, b) => a + b.price,
      0
    );

    let updatedPrice = 0;

    Object.values(data.inventory).forEach(({ count, label }) => {
      updatedPrice +=
        market.find((item) => item.label === label)?.price * count;
    });
    const percent = `${
      Math.round((updatedPrice / marketPrice) * 100 - 100) || "0"
    }%`;

    return { percent, updatedPrice, marketPrice };
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <Paper className="p-3 flex flex-col gap-3">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="flex justify-between">
              <div className="flex-col flex">
                <Typography className="font-bold" variant="h3">
                  {calculate().updatedPrice} Chc
                </Typography>
                <div className="flex items-center gap-2">
                  <Typography className="text-xl">
                    +{calculate().updatedPrice - calculate().marketPrice} Chc
                  </Typography>
                  <Chip
                    color={
                      Math.round(
                        (calculate().updatedPrice / calculate().marketPrice) *
                          100 -
                          100
                      )
                        ? Math.round(
                            (calculate().updatedPrice /
                              calculate().marketPrice) *
                              100 -
                              100
                          ) >= 0
                          ? "success"
                          : "error"
                        : "default"
                    }
                    label={<Typography>{calculate().percent}</Typography>}
                  />
                </div>
              </div>
              <div
                style={{ width: "250px", height: "200px" }}
                className="relative"
              >
                {data.inventory && (
                  <PieChart
                    sx={{ fontFamily: "Helvetica" }}
                    series={[
                      {
                        data: Object.values(data.inventory)?.map((item, i) => ({
                          id: i,
                          value:
                            market.find((i) => i.label === item.label)?.price *
                            data.inventory[item.label].count,
                          label: item.label,
                        })),
                        arcLabel: "label",
                      },
                    ]}
                    legend={{ hidden: true }}
                    tooltip={{ disabled: true }}
                    width={400}
                    height={200}
                  />
                )}
              </div>
            </div>
            {market.map((item, i) => {
              const thisItemInUserInventory = data.inventory[item.label];

              const marketPrice = thisItemInUserInventory.price;
              const updatedPrice = item.price * thisItemInUserInventory.count;

              const percent = `${
                Math.round((updatedPrice / marketPrice) * 100 - 100) || "0"
              }%`;

              return (
                <Card className="flex gap-2 p-2" key={i}>
                  <div className="flex gap-2 items-center">
                    <Avatar sx={{ width: "70px", height: "70px" }} />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Typography variant="h6">{item.label}</Typography>
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
                      </div>
                      <Typography>Můj majetek: {updatedPrice} Chc</Typography>
                      <Typography>Cena akcie: {item.price} Chc</Typography>
                    </div>
                  </div>
                </Card>
              );
            })}
          </>
        )}
      </Paper>
    </div>
  );
}
