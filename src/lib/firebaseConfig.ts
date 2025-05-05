import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbBvV0d_Ba5PH9Prs1nMiy5-QjizWASnI",
  authDomain: "grocery-app-3ca67.firebaseapp.com",
  projectId: "grocery-app-3ca67",
  storageBucket: "grocery-app-3ca67.firebasestorage.app",
  messagingSenderId: "194888974304",
  appId: "1:194888974304:web:e83afbdc7e4572fe15b585",
  measurementId: "G-NWVYZ7C8E2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);