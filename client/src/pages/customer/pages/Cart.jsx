import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { cartProducts } from "../../../store/cart/cartSlice.js";
import { ProductsSummary } from "../components/ProductsSummary.jsx";
// import { StripeWrapper } from "../components/PaymentForm";
import Button from "@mui/material/Button";
import { totalProductPrice } from "../components/ProductSummaryCard.jsx";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../store/cart/cartSlice.js";
import { useDispatch } from "react-redux";
import { createOrder, getLastOrderNumber } from "../../../firebase.js";
import"./Css/Cart.css"


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
        totalPrice: cart.reduce((acc, product) => acc + totalProductPrice(product), 0),
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

  useEffect(() => {}, [currentTab]);

  if (!cart || cart.length === 0) {
    return (
      <div className="emptyCart">
      <h1>Your cart is empty</h1>
      <Button
        variant="contained"
        className="emptyCartButton"
        onClick={() => navigate("/menu")}
      >
        Go to Menu
      </Button>
    </div>
    );
  }

  const cartTotalPrice = parseFloat(cart.reduce((total, product) => total + totalProductPrice(product), 0).toFixed(2));

  return (
    <div className="cartPage">
      <ProductsSummary />

      <div className="summaryEnd">
  
      <div className="add-item-container">
      <Button
        className="add-item-button"
        style={{
          backgroundColor: '#D2691E', 
          color: 'white',
          padding: '4px 12px',
          fontSize: '12px',
          height: 'auto', 
          minHeight: '30px',
        }}
        onClick={() => navigate("/menu")}
      >
        Add Item
      </Button>
    </div>

      <div className="total-price">
          <span>Total :</span>
          <span className="total-price-value">€ {cartTotalPrice.toFixed(2)}</span>
        </div>
        <div className="summaryButtons">
          <Button variant="contained" onClick={placeOrder}>
            Checkout
          </Button>
          
          {/* <Button
            onClick={() => handleTabSwitch("Delivery")}>
            Pay Online
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
