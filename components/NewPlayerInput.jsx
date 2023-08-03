"use client";
import { Button, TextField, Typography } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../db";

export default function NewPlayerInput() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.name;
    setDoc(doc(db, "players", value), {
      name: value,
    });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <TextField variant="outlined" label="Jméno" name="name" />
      <Button type="submit" variant="contained">
        Přidat
      </Button>
    </form>
  );
}
