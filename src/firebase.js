import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgWk8Z82AxMMJqmUUyzul2T-bIfQzDMiA",
  authDomain: "ai-interview-prep-662a3.firebaseapp.com",
  projectId: "ai-interview-prep-662a3",
  storageBucket: "ai-interview-prep-662a3.firebasestorage.app",
  messagingSenderId: "404848154182",
  appId: "1:404848154182:web:3621870fadb3bf46bedc47"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;