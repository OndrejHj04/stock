import { Button, TextField, Typography } from "@mui/material";
import { poppins } from "../layout";
import { LoginButton } from "../../../components/LoginButton";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Typography className={`${poppins.className} title`}>Burza</Typography>
      <div className="flex-1 flex justify-center items-center">
        <div
          style={{ border: "2px solid gray" }}
          className="p-4 rounded-2xl shadow-2xl flex gap-1 flex-col"
        >
          <TextField
            id="outlined-basic"
            label="Přihlašovací jméno"
            variant="outlined"
          />
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
