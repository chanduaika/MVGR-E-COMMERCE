import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA-289IDfhj4HKvDTNv12a2NURdSRw5pHc",
    authDomain: "mvgr-e-commerce.firebaseapp.com",
    projectId: "mvgr-e-commerce",
    storageBucket: "mvgr-e-commerce.firebasestorage.app",
    messagingSenderId: "400406607665",
    appId: "1:400406607665:web:c1c373ce518c54ce076210",
    measurementId: "G-9150W1BKZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
