import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyLjCjBc_AJ-nedOmEnp9pvAEdmsmdnTU",
    authDomain: "klu-snacks-live-app.firebaseapp.com",
    projectId: "klu-snacks-live-app",
    storageBucket: "klu-snacks-live-app.firebasestorage.app",
    messagingSenderId: "148435954036",
    appId: "1:148435954036:web:c700993f9b1a92da5ea421"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
