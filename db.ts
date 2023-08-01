import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyDX150whndy6I83FQKSDlw-h3uI77UrSnk",
  authDomain: "stock-57033.firebaseapp.com",
  projectId: "stock-57033",
  storageBucket: "stock-57033.appspot.com",
  messagingSenderId: "262062201247",
  appId: "1:262062201247:web:ac2be667cd4d00031a05aa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)