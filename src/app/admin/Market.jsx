"use client";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../db";
import { useRouter } from "next/navigation";


export default function Market() {
  const [data, setData] = useState(null);
  const navigation = useRouter();
  useEffect(() => {
    onSnapshot(collection(db, "items"), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => users.push(doc.data()));
      return setData(users);
    });
  }, []);

  return (
    <Paper className="flex flex-col gap-2 p-2">
      <Typography variant="h4" className="text-center">
        Předměty na burze
      </Typography>
      <div className="flex">
        {Array.isArray(data) ? (
          <>
            {data.length ? (
              <div
                className="flex flex-col overflow-scroll gap-1.5"
                style={{ maxHeight: "400px" }}
              >
                {data.map(({ name }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Typography className="mr-auto" variant="h6">
                      {name}
                    </Typography>
                    <Typography>MIN: {i},-</Typography>
                    <Typography>MAX: {i},-</Typography>
                    <Typography>MAJETEK: {i},-</Typography>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigation.push(`/administration/market/${name}`)
                      }
                    >
                      Detail
                    </Button>
                  </div>
                ))}
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
