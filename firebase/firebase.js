import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyARSicVCH9RzlQGlqxal2lGSALJVebW1G0",
//     authDomain: "connectyou-fc086.firebaseapp.com",
//     projectId: "connectyou-fc086",
//     storageBucket: "connectyou-fc086.appspot.com",
//     messagingSenderId: "748095619091",
//     appId: "1:748095619091:web:4d8273a1b31ec03d0d7fe6"
// };
const firebaseConfig = {
    apiKey: "AIzaSyDFa-Bfx9MlyFkx1aJjINH4jTzJnPmkqsw",
    authDomain: "connectyou-f525a.firebaseapp.com",
    projectId: "connectyou-f525a",
    storageBucket: "connectyou-f525a.appspot.com",
    messagingSenderId: "303013681538",
    appId: "1:303013681538:web:f33572d4921ce020dd179b"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDFa-Bfx9MlyFkx1aJjINH4jTzJnPmkqsw",
//   authDomain: "connectyou-f525a.firebaseapp.com",
//   projectId: "connectyou-f525a",
//   storageBucket: "connectyou-f525a.appspot.com",
//   messagingSenderId: "303013681538",
//   appId: "1:303013681538:web:f33572d4921ce020dd179b"
// };
