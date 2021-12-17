import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC9dtnHiWY50coVQjedIwS08azUe9V7RiE",
    authDomain: "friends-app-3b9e0.firebaseapp.com",
    projectId: "friends-app-3b9e0",
    storageBucket: "friends-app-3b9e0.appspot.com",
    messagingSenderId: "489054163844",
    appId: "1:489054163844:web:037f06e705c10ba45943d1"
  };

// Initialize Firebase
const db = initializeApp(firebaseConfig);
const storage = getStorage(db);
const fireDB = getFirestore(db);
export {db , storage, fireDB}