
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBocfd_IwPD1Egt01ybkzaxyXG8kccnPk4",
  authDomain: "cinema-60553.firebaseapp.com",
  projectId: "cinema-60553",
  storageBucket: "cinema-60553.appspot.com",
  messagingSenderId: "610645801015",
  appId: "1:610645801015:web:e66e8898e8e0497ba0e7b2",
  measurementId: "G-G4G1CZYJ5G",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();