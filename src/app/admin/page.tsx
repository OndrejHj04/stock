"use client";
import { Button, Paper, Slider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../db";
import { useState } from "react";

export default function Admin() {
  const [data, setData] = useState([]);
  const [slider, setSlider] = useState(1);
  useEffect(() => {
    onSnapshot(collection(db, "items"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      setData(data);
    });
  }, []);

  const handleAdd = ({ name, count }) => {
    updateDoc(doc(db, "items", name), {
      count: count + slider,
    });
  };

  const handleMinus = ({ name, count }) => {
    updateDoc(doc(db, "items", name), {
      count: count - slider,
    });
  };

  return (
    <Paper
      className="p-3 rounded-xl max-w-3xl"
      style={{ border: "1px solid lightgray" }}
    >
      <Typography variant="h4" className="text-center">
        Inventář
      </Typography>
      <div className="flex flex-col gap-2">
        {data.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="h6">Počet: {item.count}</Typography>
              <Button variant="contained" onClick={() => handleAdd(item)}>
                <Typography>Přidat</Typography>
              </Button>
              <Button variant="contained" onClick={() => handleMinus(item)}>
                <Typography>Odebrat</Typography>
              </Button>
            </div>
            <div className="bg-gray-200 h-0.5 w-full" />
          </React.Fragment>
        ))}
        <Typography className="text-center" variant="h6">
          Aktuální počet k přidání {slider}
        </Typography>
        <Slider
          value={slider}
          onChange={(_, number) => setSlider(number)}
          aria-label="Default"
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={10}
        />
      </div>
    </Paper>
  );
}
