import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDc2jWEUsBI_0NKsFE706XQBWbTNZkqGIY",
  authDomain: "connectyou-327d6.firebaseapp.com",
  projectId: "connectyou-327d6",
  storageBucket: "connectyou-327d6.appspot.com",
  messagingSenderId: "426948021888",
  appId: "1:426948021888:web:226f98915509a172a5a065"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
