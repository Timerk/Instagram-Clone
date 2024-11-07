import { initializeApp } from "firebase/app";
import { getAuth, getAuth } from "firebase/auth";
import { getFirestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDn1G1edCS05Kl-Aql0m1rU1PZEv37TWEc",
  authDomain: "instagram-clone-6f4c3.firebaseapp.com",
  projectId: "instagram-clone-6f4c3",
  storageBucket: "instagram-clone-6f4c3.firebasestorage.app",
  messagingSenderId: "837995441590",
  appId: "1:837995441590:web:65faed3233347e23b86517",
  measurementId: "G-NRZYSW2HBK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};