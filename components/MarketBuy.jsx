"use client";
import { TextField, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../db";

export default function MarketBuy() {
  const [name, setName] = useState("");
  const [validate, setValidate] = useState(null);

  useEffect(() => {
    if (name.length) {
      getDoc(doc(db, "players", name)).then((doc) => {
        if (doc.exists()) {
          setValidate(true);
        } else {
          setValidate(false);
        }
      });
    } else {
      setValidate(null);
    }
  }, [name]);
  console.log(name, validate);

  return (
    <form className="flex flex-col">
      <div className="flex items-center gap-3">
        <TextField
          variant="outlined"
          label="Nebuďte slušnej, řekněte jméno!"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <Image
            className="ml-5"
            height={30}
            width={30}
            alt="icon"
            src={`/check.png`}
          />
        </div>
      </div>
      <div></div>
      <div></div>
    </form>
  );
}
