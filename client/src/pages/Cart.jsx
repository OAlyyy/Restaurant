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
import axios from "axios";
import { clearCart } from "../store/cart/cartSlice.js";
import { useDispatch } from "react-redux";

const Cart = () => {
  const cart = useSelector(cartProducts);
  // eslint-disable-next-line
  const [orderId, setOrderId] = useState("");
  const [currentTab, handleTabSwitch] = useState("Summary");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeOrder = () => {
    const updatedCart = cart.filter((product) => product.amount > 0); // Remove products with amount zero
    axios
      .get("http://localhost:3001/orders/lastOrderNumber")
      .then((response) => {
        const lastOrderNumber = response.data;
        const newOrderId = lastOrderNumber + 1;
        setOrderId(newOrderId);
        const orderData = {
          orderNumber: newOrderId, // Use the new order ID here
          status: "pending",
          items: updatedCart,  // Use the updated cart without products with amount zero
          totalPrice: cart.reduce(
            (acc, product) => acc + totalPrice(product),
            0
          ),
          shippingAddress: "",
          paymentMethod: "cash",
        };
        console.log("orderData", orderData);
        dispatch(clearCart());
        axios
          .post("http://localhost:3001/orders", orderData)
          .then((response) => {
            console.log("response", response);
            navigate(`/orders/${orderData.orderNumber}`);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onTabSwitch = (event, currentTab) => {
    handleTabSwitch(currentTab);
  };

  useEffect(() => {}, [currentTab]);

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white h-full text-black flex justify-center p-4">
        <h1>Your Cart is empty</h1>
      </div>
    );
  }
  let tabContent;
  switch (currentTab) {
    case 0:
      return false;

    case "Summary":
      tabContent = (
        <div className="cartPage">
          <ProductsSummary />

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
      break;

    case "Delivery":
      tabContent = (
        <div className="Delivery-content">
          <AddressForm onTabSwitch={handleTabSwitch} />
          <Button
            variant="contained"
            onClick={() => handleTabSwitch("Payment")}
            endIcon={<SendIcon />}
          >
            Next
          </Button>
        </div>
      );
      break;

    case "Payment":
      tabContent = (
        <div className="tab-content">
          <h1>Payment Tab - Only Stripe API needed</h1>
        </div>
      );
      break;

    default:
      tabContent = null;
  }

  return (
    <div>
      <Tabs
        value={currentTab}
        onChange={onTabSwitch}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Summary" value="Summary" />
        <Tab label="Payment" value="Payment" />
      </Tabs>

      {tabContent}
    </div>
  );
};

export default Cart;
