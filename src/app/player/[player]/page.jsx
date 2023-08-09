"use client";
import { Card, CircularProgress, Paper, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../db";
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

  return (
    <div className="flex-1 flex justify-center items-center">
      <Paper className="p-3 flex flex-col gap-3">
        {loading && data && data.inventory ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4">Vítej, {player}!</Typography>
            {market.map((item, i) => {
              console.log(item);
              return (
                <Card className="flex gap-2" key={i}>
                  <Typography>{item.label}</Typography>
                  <Typography>{item.price},-</Typography>
                </Card>
              );
            })}
          </>
        )}
      </Paper>
    </div>
  );
}

// const totalCount = Object.values(data.inventory).reduce(
//   (a, b) => a + b.count,
//   0
// );

// const marketPrice = Object.values(data.inventory).reduce(
//   (a, b) => a + b.price,
//   0
// );

// let updatedPrice = 0;

// Object.values(data.inventory).forEach(({ count, label }) => {
//   updatedPrice +=
//     market.find((item) => item.label === label).price * count;
// });
// const percent = `${
//   Math.round((updatedPrice / marketPrice) * 100 - 100) || "0"
// }%`;
