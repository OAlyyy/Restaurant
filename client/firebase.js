// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKJ9Kb9RdlINdYv09FR6Bs7rOvqFZem8g",
  authDomain: "restaurant-12b3e.firebaseapp.com",
  projectId: "restaurant-12b3e",
  storageBucket: "restaurant-12b3e.appspot.com",
  messagingSenderId: "52182319303",
  appId: "1:52182319303:web:a76ce41376ed5e0dfe3ee2",
  measurementId: "G-CKL1JV672H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);