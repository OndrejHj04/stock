"use client";
import {
  Autocomplete,
  Button,
  InputAdornment,
  Slider,
  TextField,
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

export default function MarketBuy() {
  const [form, setForm] = useState({ name: "", item: "", count: 1 });
  const [validate, setValidate] = useState(null);
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(null);
  useEffect(() => {
    getDocs(collection(db, "items")).then((doc) => {
      const items = [];
      doc.forEach((d) => items.push(d.data()));
      setItems(items);
    });
  }, []);

  useEffect(() => {
    if (form.item) {
      setPrice(form.item.price * form.count);
    } else {
      setPrice(null);
    }
  }, [form.item, form.count]);

  const handleSubmit = () => {
    const {
      name,
      item: { label, price },
      count,
    } = form;
    const docRef = doc(db, "players", name);
    getDoc(docRef).then((doc) => {
      const inventoryBlank = {};
      items.forEach((item) => {
        inventoryBlank[item.label] = { label: item.label, count: 0, price: 0 };
      });
      const inventory = Object.values(doc.data().inventory).length
        ? doc.data().inventory
        : inventoryBlank;
      console.log(inventory[label])
      inventory[label] = {
        ...inventory[label],
        count: inventory[label].count + count,
        price: inventory[label].price + price * count,
      };

      updateDoc(docRef, { inventory }).then(() => {
        swal.fire(
          `Předmět "${label}" zakoupen!`,
          `Pro hráče "${name}" v počtu ${count} kusů za celkem ${
            price * count
          },- Chc`,
          "success"
        );
      });
    });
  };

  return (
    <form className="flex flex-col gap-2">
      <div className="flex items-center ">
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
          filterSelectedOptions
          onChange={(e, value) => setForm({ ...form, item: value })}
          sx={{ width: 300 }}
          id="combo-box-demo"
          options={items.map((item) => ({
            label: item.label,
            id: item.id,
            price: item.price,
          }))}
          renderInput={(params) => <TextField {...params} label="Předmět" />}
        />
      </div>
      <div>
        <Slider
          aria-label="Temperature"
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
          label="Vypocet ceny"
          sx={{ width: 300 }}
          value={price || ""}
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="start">Chc</InputAdornment>,
          }}
        />
      </div>
      <div>
        <Button
          style={{ width: "100%" }}
          variant="contained"
          onClick={handleSubmit}
          disabled={!form.name || !form?.item?.label || !validate}
        >
          Zakoupit
        </Button>
      </div>
    </form>
  );
}
