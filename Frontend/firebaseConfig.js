import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0qIW-p_sgLNW-HaC21fqfsfjnM66wBv8",
  authDomain: "videohosting-86bc3.firebaseapp.com",
  projectId: "videohosting-86bc3",
  storageBucket: "videohosting-86bc3.appspot.com",
  messagingSenderId: "298397555408",
  appId: "1:298397555408:web:cc5422192ad448bde59cd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
