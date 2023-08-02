"use client";
import {
  Button,
  CircularProgress,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../db";
import { useState } from "react";

export default function Admin() {
  const [data, setData] = useState(null);
  const [slider, setSlider] = useState(1);
  useEffect(() => {
    onSnapshot(collection(db, "items"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      setData(data);
    });
  }, []);

  const handleIncrement = (name, count) => {
    updateDoc(doc(db, "items", name), {
      count: count + slider,
    });
  };

  const handleDecrement = (name, count) => {
    updateDoc(doc(db, "items", name), {
      count: count - slider,
    });
  };

  return (
    <Paper className="p-3 max-w-md mx-auto flex flex-col gap-2 items-center">
      <Typography variant="h4">Předměty na burze</Typography>
      {Array.isArray(data) ? (
        <>
          {data.length ? (
            <>
              {data.map(({ name, count }, i) => (
                <React.Fragment key={i}>
                  <div className="flex gap-3 items-center">
                    <div className="mr-auto">
                      <Typography variant="h6">Zbraň</Typography>
                    </div>
                    <div>
                      <Typography>POČET: {count}</Typography>
                    </div>
                    <div>
                      <Button
                        onClick={() => handleIncrement(name, count)}
                        variant="contained"
                      >
                        <Typography>Přidat</Typography>
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => handleDecrement(name, count)}
                        variant="contained"
                      >
                        <Typography>Odebrat</Typography>
                      </Button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              <Typography>žádná data v databázi</Typography>
            </>
          )}
        </>
      ) : (
        <CircularProgress />
      )}
      <Typography variant="h6">Hodnota slideru: {slider}</Typography>
      <Slider
        value={slider}
        valueLabelDisplay="auto"
        onChange={(_, number) => setSlider(number)}
        step={1}
        marks
        min={1}
        max={10}
      />
    </Paper>
  );
}
