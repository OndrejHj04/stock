import { Paper } from "@mui/material";
import React from "react";
import MarketBuy from "../../../components/MarketBuy";
import Notifi from "../../../components/Notifi";
import MarketSell from "../../../components/MarketSell";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Dashboard() {
  const data = [
    { title: "Nákup", component: <MarketBuy /> },
    { title: "Prodej", component: <MarketSell /> },
    { title: "Notifikace", component: <Notifi /> },
  ];
  return (
    <Paper className="flex flex-col gap-2 p-2" sx={{ maxWidth: "600px" }}>
      <Typography variant="h4" className="text-center">
        Dashboard
      </Typography>
      {data.map(({ title, component }, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{component}</AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}
