import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Live Production Configuration
const prodConfig = {
    apiKey: "AIzaSyCyLjCjBc_AJ-nedOmEnp9pvAEdmsmdnTU",
    authDomain: "klu-snacks-live-app.firebaseapp.com",
    projectId: "klu-snacks-live-app",
    storageBucket: "klu-snacks-live-app.firebasestorage.app",
    messagingSenderId: "148435954036",
    appId: "1:148435954036:web:c700993f9b1a92da5ea421"
};

// Local Development Configuration
const devConfig = {
    apiKey: "AIzaSyBadIdJPESYPZex1vzgDYXr3hFK5aBrNQQ",
    authDomain: "klu-snacks-dev.firebaseapp.com",
    projectId: "klu-snacks-dev",
    storageBucket: "klu-snacks-dev.firebasestorage.app",
    messagingSenderId: "398385874570",
    appId: "1:398385874570:web:b4a22b89c0420f75820f73",
    measurementId: "G-6XZ3865HM4"
};

// Use dev config during local development (npm run dev) and prod config in production (Vercel)
const firebaseConfig = import.meta.env.DEV ? devConfig : prodConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
