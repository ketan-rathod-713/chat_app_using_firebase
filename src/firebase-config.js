// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth , GoogleAuthProvider } from 'firebase/auth';

// For firestore
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtl9kBuPLQSKxxnSjMpRx0nKtkPf7_e0I",
  authDomain: "fir-reactchatapp-a3bf4.firebaseapp.com",
  projectId: "fir-reactchatapp-a3bf4",
  storageBucket: "fir-reactchatapp-a3bf4.appspot.com",
  messagingSenderId: "1020959700265",
  appId: "1:1020959700265:web:bd37ff58669d2f88703338"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)