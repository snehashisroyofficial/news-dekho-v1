// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_APP_FIREBASE_API_KEY as string,
  authDomain: process.env.VITE_APP_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.VITE_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env
    .VITE_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.VITE_APP_FIREBASE_APP_ID as string,
  measurementId: process.env.VITE_APP_FIREBASE_MEASUREMENT_ID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export const functions = getFunctions(app);
export const googleProvider = new GoogleAuthProvider();
