import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOs1GaJjtuE6Av51ZT73p4Mt5mnb5OXOo",
    authDomain: "tulips-hostel-snacks-v2.firebaseapp.com",
    projectId: "tulips-hostel-snacks-v2",
    storageBucket: "tulips-hostel-snacks-v2.firebasestorage.app",
    messagingSenderId: "101709890817",
    appId: "1:101709890817:web:6d2169b8c4af4cf8d2c700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Enable offline persistence for faster subsequent loads
import { enableIndexedDbPersistence } from "firebase/firestore";
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
    } else if (err.code === 'unimplemented') {
        console.warn("The current browser does not support all of the features required to enable persistence");
    }
});

export { db };
