import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcXSIwSPga7z9hyTodqfh4RURJpDvpa5o",
  authDomain: "fir-88a0c.firebaseapp.com",
  projectId: "fir-88a0c",
  storageBucket: "fir-88a0c.appspot.com",
  messagingSenderId: "787798438194",
  appId: "1:787798438194:web:a25cbc4f737b3647be272b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
