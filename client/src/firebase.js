// firebase.js
import { initializeApp } from "firebase/app";
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore, doc, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKJ9Kb9RdlINdYv09FR6Bs7rOvqFZem8g",
  authDomain: "restaurant-12b3e.firebaseapp.com",
  projectId: "restaurant-12b3e",
  storageBucket: "restaurant-12b3e.appspot.com",
  messagingSenderId: "52182319303",
  appId: "1:52182319303:web:a76ce41376ed5e0dfe3ee2",
  measurementId: "G-CKL1JV672H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const fetchProducts = async () => {
  const colRef = collection(db, "Products");

  const docsSnap = await getDocs(colRef);

  const products = [];
  docsSnap.forEach((doc) => {
    const product = doc.data();
    products.push(product);
  });

  return products;
};

export { app, fetchProducts };
