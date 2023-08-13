"use client";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../../db";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      router.push("/admin");
    } else if (localStorage.getItem("username")) {
      router.push(`/player/${localStorage.getItem("username")}`);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (username === process.env.PASSWORD) {
      localStorage.setItem("admin", true);
      router.push("/admin");
    }
  }, [username]);

  const handleLogin = () => {
    getDoc(doc(db, "players", username)).then((doc) => {
      if (doc.exists()) {
        localStorage.setItem("username", username);
        router.push(`/player/${username}`);
      } else {
        Swal.fire("Chyba", "Uživatel neexistuje!", "error");
      }
    });
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <Paper className="p-3 flex flex-col gap-3">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography className="text-center" variant="h4">
              Přihlásit se
            </Typography>
            <TextField
              sx={{ width: 300 }}
              variant="outlined"
              label="Zadej uživatelské jméno"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button variant="contained" onClick={handleLogin}>
              <Typography>Přihlásit se!</Typography>
            </Button>
          </>
        )}
      </Paper>
    </div>
  );
}
