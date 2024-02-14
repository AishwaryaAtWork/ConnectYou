import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD07ycgcp90HIjcmQD3gFrmJwmXcqDSpRo",
  authDomain: "connectyou-2bfb1.firebaseapp.com",
  projectId: "connectyou-2bfb1",
  storageBucket: "connectyou-2bfb1.appspot.com",
  messagingSenderId: "201045855199",
  appId: "1:201045855199:web:00b27340daf73a1879d26a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
