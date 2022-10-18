// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1laAGxJucYTw3-7hpyrKIaEKDt1AN9I0",
  authDomain: "blog-3e417.firebaseapp.com",
  projectId: "blog-3e417",
  storageBucket: "blog-3e417.appspot.com",
  messagingSenderId: "325614038764",
  appId: "1:325614038764:web:a2566772ae48215f417fc9",
  measurementId: "G-BBFLJQHZDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
