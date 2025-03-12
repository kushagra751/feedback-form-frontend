// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_tT88C2Hgft1X3l9XDVstayzz0UVdB00",
  authDomain: "feedback-form-4292a.firebaseapp.com",
  projectId: "feedback-form-4292a",
  storageBucket: "feedback-form-4292a.firebasestorage.app",
  messagingSenderId: "764607130035",
  appId: "1:764607130035:web:43079903233cc16019c3c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
