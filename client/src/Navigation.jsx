import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import MyOrder from "./pages/MyOrder";
import Cart from "./pages/Cart";
import Admin from "./components/Admin.jsx";
import PaymentSuccess from "./pages/PaymentSuccess";
import { useSelector } from "react-redux";
import { cartProducts } from "./store/cart/cartSlice";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import NavMenu from "./components/NavMenu";

const Navigation = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/user/auth").then((response) => {
      if (response.data.error) {
        setAuthState((prevState) => ({ ...prevState, status: false }));
      } else {
        setAuthState((prevState) => ({
          ...prevState,
          username: response.data.username,
          id: response.data.id,
          status: true,
        }));
      }
    });
  }, []);

  const productsInCart = useSelector(cartProducts);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <NavMenu cartCount={productsInCart ? productsInCart.length : 0} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderNumber" element={<MyOrder />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>

      <Footer />
    </AuthContext.Provider>
  );
};

export default Navigation;
