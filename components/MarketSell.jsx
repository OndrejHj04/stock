"use client";
import {
  Autocomplete,
  Button,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../db";

export default function MarketSell() {
  const [form, setForm] = useState({ name: "", item: null, count: null });
  const [validate, setValidate] = useState(null);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getDocs(collection(db, "items")).then((doc) => {
      const items = [];
      doc.forEach((d) => items.push(d.data()));
      setItems(items);
    });
  }, []);

  useEffect(() => {
    if (validate) {
      getDoc(doc(db, "players", form.name)).then((doc) => {
        setUser(doc.data());
      });
    } else if (user) {
      setUser(null);
    }
  }, [validate]);

  useEffect(() => {
    if (!form.item) {
      setForm({ ...form, count: null });
    }
  }, [form.item]);
  return (
    <>
      <form className="flex flex-col gap-2">
        <div className="flex items-center">
          <TextField
            variant="outlined"
            label="Nebuďte slušnej, řekněte jméno!"
            value={form.name}
            sx={{ width: 300 }}
            error={validate === null ? false : !validate}
            onChange={(e) => {
              const name = e.target.value;
              setForm({ ...form, name });

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
            }}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            disabled={!user}
            filterSelectedOptions
            onChange={(e, value) => setForm({ ...form, item: value })}
            sx={{ width: 300 }}
            id="combo-box-demo"
            options={items.map((item) => {
              if (user?.inventory.some((i) => i.id === item.id)) {
                return item;
              }
            })}
            renderInput={(params) => <TextField {...params} label="Předmět" />}
          />
        </div>
        <div>
          <Slider
            aria-label="Temperature"
            disabled={!user || !form.item}
            value={form.count}
            onChange={(_, value) => setForm({ ...form, count: value })}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={user?.inventory.reduce((prev, curr) => prev + curr.count, 0)}
          />
        </div>
        <div>
          <TextField
            InputProps={{ readOnly: true }}
            label="Trzní cena vybraných předmětů"
            sx={{ width: 300 }}
            value={form.count * form.item?.price || ""}
          />
        </div>
        <div>
          <Button variant="contained" className="w-full" disabled={!form.count}>
            <Typography>Prodat {form.count} předmět</Typography>
          </Button>
        </div>
      </form>
    </>
  );
}
