// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeiCLgFiKqSorjrOwea0qXGPxLatQX0AI",
  authDomain: "royal-priesthood-41f2d.firebaseapp.com",
  projectId: "royal-priesthood-41f2d",
  storageBucket: "royal-priesthood-41f2d.appspot.com",
  messagingSenderId: "345356162920",
  appId: "1:345356162920:web:50e0e236778349527ae8dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)