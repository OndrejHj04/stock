"use client";
import {
  Autocomplete,
  Button,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../db";
import swal from "sweetalert2";

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
      setForm({ ...form, item: null, count: null });
      setUser(null);
    }
  }, [validate]);

  useEffect(() => {
    if (!form.item) {
      setForm({ ...form, count: null });
    } else {
      setForm({ ...form, count: 1 });
    }
  }, [form.item]);

  const handleSell = () => {
    const itemValueInUserInventory = user.inventory[form.item.label].price;
    const itemCountInUserInventory = user.inventory[form.item.label].count;
    const newCountAfterSell = itemCountInUserInventory - form.count;

    const makePrice =
      (itemValueInUserInventory / itemCountInUserInventory) * newCountAfterSell;

    updateDoc(doc(db, "players", form.name), {
      ...user,
      inventory: {
        ...user.inventory,
        [form.item.label]: {
          ...user.inventory[form.item.label],
          count: user.inventory[form.item.label].count - form.count,
          price: makePrice,
        },
      },
    }).then(() => {
      swal.fire(
        `Prodáno za ${form.item.price}!`,
        `Předmět ${form.item.label} uživatele ${form.name} prodán`,
        "success"
      );
    });
  };

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
            options={user?.inventory ? Object.values(user?.inventory) : []}
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
            max={10}
          />
        </div>
        <div>
          <TextField
            InputProps={{ readOnly: true }}
            label="Trzní cena vybraných předmětů"
            sx={{ width: 300 }}
            value={
              items.length && form.item
                ? form.count *
                  items.find((item) => item.label === form.item.label).price
                : ""
            }
          />
        </div>
        <div>
          <Button
            variant="contained"
            className="w-full"
            disabled={!form.count}
            onClick={handleSell}
          >
            <Typography>Prodat {form.count} předmět</Typography>
          </Button>
        </div>
      </form>
    </>
  );
}
