// firebase.js
import { initializeApp } from "firebase/app";
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs,addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


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

export const auth = getAuth(app);

const db = getFirestore(app);

const fetchProducts = async () => {
  const colRef = collection(db, "Products");

  const docsSnap = await getDocs(colRef);

  const products = [];
  docsSnap.forEach((doc) => {
    const product = doc.data();
    const documentId = doc.id; // Retrieve the document ID
    products.push({ documentId, ...product }); // Include the document ID in the product object
  });

  return products;
};


const createProduct = async (productData) => {
  const colRef = collection(db, 'Products');

  try {
    const docRef = await addDoc(colRef, productData);
    console.log('Product added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};



export { app, fetchProducts, createProduct  };
