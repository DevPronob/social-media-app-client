// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUKXzeMYzFjYqClvAnOz1OHoWKITItxJY",
  authDomain: "social-media-app-274d0.firebaseapp.com",
  projectId: "social-media-app-274d0",
  storageBucket: "social-media-app-274d0.appspot.com",
  messagingSenderId: "347757915587",
  appId: "1:347757915587:web:d8e83b0ecae6addc37e176"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  auth =getAuth(app);

export default auth;