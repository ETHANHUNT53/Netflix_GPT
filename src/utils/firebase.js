// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1aRYOYuruCSULV6mQ8by3AyOG-3DBYwE",
  authDomain: "netflix-gpt-450b4.firebaseapp.com",
  projectId: "netflix-gpt-450b4",
  storageBucket: "netflix-gpt-450b4.firebasestorage.app",
  messagingSenderId: "433909989493",
  appId: "1:433909989493:web:9e9f2ff1fbb906f05ab83c",
  measurementId: "G-NJYXGRB5P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

