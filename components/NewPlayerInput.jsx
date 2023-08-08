"use client";
import { Button, TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../db";
import swal from "sweetalert2";
export default function NewPlayerInput() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.name;
    setDoc(doc(db, "players", value), {
      name: value,
      inventory: {},
    })
      .then(() => swal.fire("Přidáno", `Hráč "${value}" byl přidán`, "success"))
      .catch((err) => swal.fire("Chyba", err.message, "error"));
  };

  return (
    <form
      className="flex flex-col gap-2"
      style={{ maxWidth: "320px", width: "100%", marginInline: "auto" }}
      onSubmit={handleSubmit}
    >
      <TextField variant="outlined" label="Jméno" name="name" />
      <Button type="submit" variant="contained">
        Přidat
      </Button>
    </form>
  );
}
