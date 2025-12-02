// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDRYL_ZMk63p5vcXpiSkATwENCCUfdB-gc",
  authDomain: "placed-bf85e.firebaseapp.com",
  projectId: "placed-bf85e",
  storageBucket: "placed-bf85e.firebasestorage.app",
  messagingSenderId: "112864331174",
  appId: "1:112864331174:web:abcefb2f798788bc6a3b67",
  measurementId: "G-W2HLZZJD7R"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig):getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);