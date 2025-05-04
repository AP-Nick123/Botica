import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhy5TddO1_cq0PsHgJuRrcN3UUh9uFj2g",
    authDomain: "botica-24e6a.firebaseapp.com",
    projectId: "botica-24e6a",
    storageBucket: "botica-24e6a.firebasestorage.app",
    messagingSenderId: "967764846169",
    appId: "1:967764846169:web:dfbe446e47d0dd68b1f348"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
