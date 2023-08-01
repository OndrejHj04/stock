"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  const { push } = useRouter();

  const handleLogin = () => {
    push("/dashboard");
  };

  return (
    <Button onClick={handleLogin} variant="contained">
      Přihlásit se
    </Button>
  );
};
