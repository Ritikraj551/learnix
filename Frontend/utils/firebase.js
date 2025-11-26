// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mentora-db05c.firebaseapp.com",
  projectId: "mentora-db05c",
  storageBucket: "mentora-db05c.firebasestorage.app",
  messagingSenderId: "865570394327",
  appId: "1:865570394327:web:211b11fb9dea78da516092"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider}


