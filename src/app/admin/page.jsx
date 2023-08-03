import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import getAllPlayers from "../../../lib/getAllPlayers";
import NewPlayerInput from "../../../components/NewPlayerInput";
export default async function Page() {
  const userData = getAllPlayers();
  const data = await userData;

  return (
    <Paper className="flex flex-col gap-2 p-2">
      <Typography variant="h4">Player List</Typography>
      <NewPlayerInput />
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Typography>{item.name}</Typography>
          <Button variant="contained" className="ml-auto">Detail</Button>
        </div>
      ))}
    </Paper>
  );
}
