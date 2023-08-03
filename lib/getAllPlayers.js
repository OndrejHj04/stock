import { collection, getDocs } from "firebase/firestore";
import { db } from "../db";

export default async function getAllPlayers() {
  const res = await getDocs(collection(db, "players"));
  const data = res.docs.map((doc) => doc.data());

  return data;
}
