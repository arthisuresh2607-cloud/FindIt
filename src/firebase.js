import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from image_9339a5.png
const firebaseConfig = {
  apiKey: "AIzaSyAV-Ria42q2kjYhSz83jNiHLhgsBIBbUb8",
  authDomain: "find-it-76985.firebaseapp.com",
  projectId: "find-it-76985",
  storageBucket: "find-it-76985.firebasestorage.app",
  messagingSenderId: "711097473642",
  appId: "1:711097473642:web:a018c69e426a4626720813"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database instance for your components to import
export const db = getFirestore(app);