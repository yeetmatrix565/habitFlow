import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2SsGEUoYKlzjqvDiZz9EDr_Vihy2l4UI",
  authDomain: "habitfloww-a9e37.firebaseapp.com",
  projectId: "habitfloww-a9e37",
  storageBucket: "habitfloww-a9e37.firebasestorage.app",
  messagingSenderId: "704765184146",
  appId: "1:704765184146:web:72c266adf0ea79b4f73e4b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Google login provider
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});