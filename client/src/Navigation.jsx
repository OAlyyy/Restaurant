import { Route, Routes } from "react-router-dom";
import { Footer } from "./pages/customer/components/Footer.jsx";
import Home from "./pages/customer/pages/Home.jsx";
import Login from "./pages/customer/pages/Login.jsx";
import Register from "./pages/customer/pages/Register.jsx";
import Menu from "./pages/customer/pages/Menu.jsx";
import Orders from "./pages/admin/pages/Orders.jsx";
import MyOrder from "./pages/customer/pages/MyOrder.jsx";
import Cart from "./pages/customer/pages/Cart.jsx";
import Admin from "./pages/admin/pages/Admin.jsx";
import PaymentSuccess from "./pages/customer/pages/PaymentSuccess.jsx";
import { useSelector } from "react-redux";
import { cartProducts } from "./store/cart/cartSlice";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import NavMenu from "./pages/customer/components/NavMenu.jsx";
import Header from "./pages/customer/components/Header.jsx";
import { auth } from "./firebase";


const Navigation = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthState((prevState) => ({
          ...prevState,
          username: user.displayName,
          id: user.uid,
          status: true,
        }));
      } else {
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    });

    return () => unsubscribe(); // Unsubscribe from the auth state changes when component unmounts
  }, [setAuthState]);

  const productsInCart = useSelector(cartProducts);

  return (
    <div className="Navigation">
       <Header className="Header"/>
     <div className="InApp">
    <AuthContext.Provider value={{ authState, setAuthState }}>
     
      <Routes>
        <Route path="/" element={<Menu/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderNumber" element={<MyOrder />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </AuthContext.Provider>
    </div>
    <div className="footer">
       <Footer/>
    </div>
   
    </div>
  );
};

export default Navigation;
