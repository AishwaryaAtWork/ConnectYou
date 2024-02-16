import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNcNKNZV-zbTdtQvvqT9WG2bWEWbBJ9QA",
  authDomain: "connectyou-e69c8.firebaseapp.com",
  projectId: "connectyou-e69c8",
  storageBucket: "connectyou-e69c8.appspot.com",
  messagingSenderId: "868751637533",
  appId: "1:868751637533:web:98ad20c5a2f02f0b1bdaf4"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
