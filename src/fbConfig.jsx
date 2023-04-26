import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: "estacion-express.firebaseapp.com",
  projectId: "estacion-express",
  storageBucket: "estacion-express.appspot.com",
  messagingSenderId: "568760590983",
  appId: import.meta.env.VITE_FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);