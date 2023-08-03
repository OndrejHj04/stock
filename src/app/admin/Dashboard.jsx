import { Paper, Typography } from "@mui/material";
import React from "react";
import MarketBuy from "../../../components/MarketBuy";

export default function Dashboard() {
  return (
    <Paper className="flex flex-col gap-2 p-2">
      <Typography variant="h4" className="text-center">
        Dashboard
      </Typography>
      <MarketBuy />
    </Paper>
  );
}
