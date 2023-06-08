import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  getDoc,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  limit,
} from "firebase/firestore";
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

// Get Products
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
// Create Products
const createProduct = async (productData) => {
  const colRef = collection(db, "Products");

  try {
    const docRef = await addDoc(colRef, productData);
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
// Delete Products
const removeProduct = async (productId) => {
  const productRef = doc(db, "Products", productId);

  try {
    await deleteDoc(productRef);
    console.log("Product removed with ID:", productId);
  } catch (error) {
    console.error("Error removing product:", error);
    throw error;
  }
};

// Fetch all orders
const fetchOrders = async () => {
  try {
    const colRef = collection(db, "Orders");
    const docsSnap = await getDocs(colRef);
    const orders = [];
    docsSnap.forEach((doc) => {
      const order = doc.data();
      const documentId = doc.id; // Retrieve the document ID
      orders.push({ documentId, ...order }); // Include the document ID in the order object
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Get the last order number created in the database
const getLastOrderNumber = async () => {
  const colRef = collection(db, "Orders");
  const q = query(colRef, orderBy("orderNumber", "desc"), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return 0; // No orders found
  }
  const docSnapshot = querySnapshot.docs[0];
  const order = docSnapshot.data();
  return order.orderNumber || 0; // Retrieve the last order number
};

// Create an Order
const createOrder = async (orderData) => {
  try {
    // Get the last order number
    const lastOrderNumber = await getLastOrderNumber();

    // Increment the last order number by one
    const newOrderNumber = lastOrderNumber + 1;

    // Set the order number in the order data
    orderData.orderNumber = newOrderNumber;

    // Update the product array to include extras and size
    const updatedProducts = orderData.items.map((product) => ({
      ...product,
      extras: product.extras, // Set the extras from the selectedData
      size: product.size, // Set the size from the selectedData
    }));

    orderData.items = updatedProducts;

    // Create the new order document with the order number as the document ID
    const docRef = doc(db, "Orders", newOrderNumber.toString());
    await setDoc(docRef, orderData);

    console.log("Order added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

// Fetch a specific order based on order number
const fetchOrder = async (orderNumber) => {
  const orderRef = doc(db, "Orders", orderNumber);
  try {
    const docSnapshot = await getDoc(orderRef);
    if (!docSnapshot.exists()) {
      return null; // Order not found
    }

    const order = docSnapshot.data();
    const documentId = docSnapshot.id; // Retrieve the document ID
    return { documentId, ...order }; // Include the document ID in the order object
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// Update order status of a specific order
const updateOrderStatus = async (orderId, newStatus) => {
  const orderRef = doc(db, "Orders", orderId);
  await updateDoc(orderRef, { status: newStatus });
};

const editProduct = async (documentId, updatedData) => {
  const productRef = doc(db, "Products", documentId);

  try {
    await updateDoc(productRef, updatedData);
    console.log("Product edited with ID:", documentId);
  } catch (error) {
    console.error("Error editing product:", error);
  }
};

export {
  app,
  fetchProducts,
  createProduct,
  fetchOrders,
  createOrder,
  removeProduct,
  fetchOrder,
  getLastOrderNumber,
  updateOrderStatus,
  editProduct,
};
