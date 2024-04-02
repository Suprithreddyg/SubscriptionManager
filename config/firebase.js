import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAki20ygtrfNhKbaZKI9owJMWWNz4_tsJI",
  authDomain: "subscriptions-a6823.firebaseapp.com",
  databaseURL: "https://subscriptions-a6823-default-rtdb.firebaseio.com",
  projectId: "subscriptions-a6823",
  storageBucket: "subscriptions-a6823.appspot.com",
  messagingSenderId: "540048402072",
  appId: "1:540048402072:web:2e8d5cf08abf4e198e12ed",
  measurementId: "G-C688QCT210"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// Initialize Realtime Database and get a reference to the service
export const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);