"use client";
import {
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../db";
import NewPlayerInput from "../../../components/NewPlayerInput";
import { useRouter } from "next/navigation";

export default function Players() {
  const [data, setData] = useState(null);
  const [market, setMarket] = useState(null);
  const navigation = useRouter();
  useEffect(() => {
    onSnapshot(collection(db, "players"), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => users.push(doc.data()));
      return setData(users);
    });

    getDocs(collection(db, "items")).then((market) => {
      const marketData = [];
      market.forEach((doc) => marketData.push(doc.data()));
      setMarket(marketData);
    });
  }, []);

  return (
    <Paper className="flex flex-col gap-2 p-2">
      <Typography variant="h4" className="text-center">
        List Hráčů
      </Typography>
      <NewPlayerInput />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {data &&
              data.map(({ name, inventory }, i) => {
                const totalCount = Object.values(inventory).reduce(
                  (a, b) => a + b.count,
                  0
                );
                const marketPrice = Object.values(inventory).reduce(
                  (a, b) => a + b.price,
                  0
                );
                let updatedPrice = 0;

                Object.values(inventory).forEach(({ count, label }) => {
                  updatedPrice +=
                    market.find((item) => item.label === label).price * count;
                });
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Typography variant="h6">{name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          Math.round((updatedPrice / marketPrice) * 100 - 100)
                            ? Math.round(
                                (updatedPrice / marketPrice) * 100 - 100
                              ) >= 0
                              ? "success"
                              : "error"
                            : "default"
                        }
                        label={`${
                          Math.round(
                            (updatedPrice / marketPrice) * 100 - 100
                          ) || "0"
                        }%`}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>POČET PŘEDMĚTŮ: {totalCount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        AKTUÁLNÍ HODNOTA: {updatedPrice},-
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => navigation.push(`/admin/player/${name}`)}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
