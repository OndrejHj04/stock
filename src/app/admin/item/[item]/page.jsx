"use client";
import {
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ResponsiveChartContainer,
  BarPlot,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
  axisClasses,
  MarkPlot,
  LineChart,
} from "@mui/x-charts";
import { db } from "../../../../../db";
import moment from "moment";
import { useRouter } from "next/navigation";
import swal from "sweetalert2";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
export default function Player({ params: { item } }) {
  const [data, setData] = useState(null);
  const [price, setPrice] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getDoc(doc(db, "items", item)).then((doc) => {
      if (doc.exists()) {
        setData(doc.data());
        setPrice(doc.data().price.toString());
      } else {
        router.push("/admin");
      }
    });
  }, []);

  const handlePriceChange = () => {
    swal
      .fire({
        title: `Změnit cenu "${item}"`,
        text: `Z původní ceny ${data.price},- Chc na novou cenu ${price},- Chc.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Potvrdit",
        cancelButtonText: "Zrušit",
      })
      .then((result) => {
        if (result.isConfirmed) {
          const newData = {
            ...data,
            history: [
              ...data.history,
              { price: data.price, timestamp: moment().format("DD.MM HH:mm") },
            ],
            price: Number(price),
          };
          updateDoc(doc(db, "items", item), newData);
          setData(newData);
        }
      });
  };

  return (
    <div>
      <Paper className="flex flex-col gap-2 p-2">
        {!data ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <>
            <Typography variant="h4" className="text-center">
              Předmět: {item}
            </Typography>
            <div className="flex flex-col gap-2">
              <TextField
                type="number"
                variant="outlined"
                label="Cena"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">Chc</InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                className="z-10"
                color="primary"
                disabled={data.price === Number(price) || !price}
                onClick={() => handlePriceChange()}
              >
                <Typography>Změnit</Typography>
              </Button>
            </div>

            {data.history.length ? (
              <div>
                <Typography variant="h5">Graf:</Typography>
                <div className="relative" style={{ width: 500, height: 220 }}>
                  <div className="absolute -top-20">
                    <LineChart
                      width={500}
                      height={300}
                      series={[
                        {
                          data: data.history.map(({ price }) => price),
                        },
                      ]}
                      xAxis={[
                        {
                          scaleType: "point",
                          data: data.history.map(({ timestamp }) => timestamp),
                        },
                      ]}
                      sx={{
                        ".MuiChartsAxis-bottom": {
                          display: "none",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Typography variant="h5">Žádná historie změn ceny</Typography>
              </>
            )}
          </>
        )}
      </Paper>
    </div>
  );
}
