"use client";
import { Button, CircularProgress, Slider, Typography } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../db";

export default function Inventory() {
  const [data, setData] = useState(null);
  const [slider, setSlider] = useState(1);

  useEffect(() => {
    onSnapshot(collection(db, "items"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      setData(data);
    });
  }, []);

  const handleIncrement = (name, price, history) => {
    console.log(price, slider);
    updateDoc(doc(db, "items", name), {
      price: price + slider,
    });
  };

  const handleDecrement = (name, price) => {
    updateDoc(doc(db, "items", name), {
      price: price - slider,
    });
  };

  return (
    <>
      <Typography variant="h4">Předměty na burze</Typography>
      {Array.isArray(data) ? (
        <>
          {data.length ? (
            <>
              {data.map(({ name, price, history }, i) => (
                <React.Fragment key={i}>
                  <div className="flex gap-3 items-center">
                    <div className="mr-auto">
                      <Typography variant="h6">Zbraň</Typography>
                    </div>
                    <div>
                      <Typography>CENA: {price}</Typography>
                    </div>
                    <div>
                      <Button
                        onClick={() => handleIncrement(name, price, history)}
                        variant="contained"
                      >
                        <Typography>Přidat</Typography>
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => handleDecrement(name, price, history)}
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
    </>
  );
}
