import { Button, TextField, Typography } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../../../db";
import Swal from "sweetalert2";

export default function AddPlayer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.name;
    console.log(value);
    setDoc(doc(db, "players", value), {
      name: value,
    })
      .then(() => {
        Swal.fire(`Podařilo se přidat uživatele ${value}`, "", "success");
      })
      .catch(() => {
        Swal.fire(`Něco se pokazilo`, "", "errror");
      });
  };
  return (
    <>
      <Typography variant="h4">Administrace hráčů</Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextField label="Jméno" name="name" />
        <Button variant="contained" type="submit">
          Přidat
        </Button>
      </form>
      <div className="flex flex-col"></div>
    </>
  );
}
