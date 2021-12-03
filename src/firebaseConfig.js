import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBHYQHHULD0PHDRvKrZvFwoDXHrssa7uXs",
    authDomain: "friends-88c0c.firebaseapp.com",
    projectId: "friends-88c0c",
    storageBucket: "friends-88c0c.appspot.com",
    messagingSenderId: "115838858031",
    appId: "1:115838858031:web:d81ecd2e29829f9f55e7da"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);

export default db;