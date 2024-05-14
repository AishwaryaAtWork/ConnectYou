import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMojRwHcUkPp1bPdhw2tIEgWrRPWMMZGg",
  authDomain: "connectyou-300ca.firebaseapp.com",
  projectId: "connectyou-300ca",
  storageBucket: "connectyou-300ca.appspot.com",
  messagingSenderId: "553644090359",
  appId: "1:553644090359:web:1aa0d2d3a34f83809e04f2"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
