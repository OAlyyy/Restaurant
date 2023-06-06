import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { cartProducts } from "../store/cart/cartSlice.js";
import { AddressForm } from "../components/AddressForm";
import { ProductsSummary } from "../components/ProductsSummary";
// import { StripeWrapper } from "../components/PaymentForm";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { totalPrice } from "../components/ProductSummaryCard.jsx";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cart/cartSlice.js";
import { useDispatch } from "react-redux";
import {  createOrder, getLastOrderNumber } from "../firebase.js";

const Cart = () => {
  const cart = useSelector(cartProducts);
  // eslint-disable-next-line
  const [orderId, setOrderId] = useState("");
  const [currentTab, handleTabSwitch] = useState("Summary");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeOrder = async () => {
    const updatedCart = cart.filter((product) => product.amount > 0); // Remove products with amount zero
    try {
      const lastOrderNumber = await getLastOrderNumber();
      const newOrderId = lastOrderNumber + 1;
      setOrderId(newOrderId);
      const orderData = {
        orderNumber: newOrderId, // Use the new order ID here
        status: "pending",
        items: updatedCart, // Use the updated cart without products with amount zero
        totalPrice: cart.reduce((acc, product) => acc + totalPrice(product), 0),
        shippingAddress: "",
        paymentMethod: "cash",
      };

      console.log("orderData", orderData);
      dispatch(clearCart());
      const orderId = await createOrder(orderData);
      console.log("orderId", orderId);
      navigate(`/orders/${orderData.orderNumber}`);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const onTabSwitch = (event, currentTab) => {
    handleTabSwitch(currentTab);
  };

  useEffect(() => {}, [currentTab]);

  if (!cart || cart.length === 0) {
    return (
      <div className="emptyCart">
        <h1>Your Cart Is Still Empty</h1>
      </div>
    );
  }
  

  return (
    <div className="cartPage">
    <ProductsSummary/>

    <div className="summaryEnd">
      <div className="total-price">
        Total : €
        {cart
          .reduce((acc, product) => acc + totalPrice(product), 0)
          .toFixed(2)}
      </div>
      <div className="summaryButtons">
        <Button variant="contained" onClick={placeOrder}>
          Pay at Cashier
        </Button>

        <Button
          onClick={() => handleTabSwitch("Delivery")}
          endIcon={<SendIcon />}
        >
          Pay Online
        </Button>
      </div>
    </div>
  </div>

  );
};

export default Cart;
