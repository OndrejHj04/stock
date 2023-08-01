"use client";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../db";

export default function Admin() {
  useEffect(() => {
    onSnapshot(collection(db, "items"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
    });
  });
  return <Typography></Typography>;
}
