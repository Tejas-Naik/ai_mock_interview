import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWDoTBof114EZO1J3u7HYF4qtovEVjUIg",
  authDomain: "prepwise-4da19.firebaseapp.com",
  projectId: "prepwise-4da19",
  storageBucket: "prepwise-4da19.firebasestorage.app",
  messagingSenderId: "898999818819",
  appId: "1:898999818819:web:fa1f3d67fc02c9931952f6",
  measurementId: "G-5FS18V62HK",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
