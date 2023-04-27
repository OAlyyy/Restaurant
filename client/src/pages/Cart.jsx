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

const Cart = () => {
  const cart = useSelector(cartProducts);
  const [currentTab, handleTabSwitch] = useState("Summary");
  console.log("cart ***************** cart =>>>>>>", cart);
  const navigate = useNavigate();

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
              Total : $
              {cart
                .reduce((acc, product) => acc + totalPrice(product), 0)
                .toFixed(2)}
            </div>
            <div className="summaryButtons">

              <Button variant="contained" onClick={() => navigate("/menu")}>
                Forgot Something ?
              </Button>
              
              <Button
               
                onClick={() => handleTabSwitch("Delivery")}
                endIcon={<SendIcon />}
              >
                Next
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
      >
        <Tab label="Summary" value="Summary" />
        <Tab label="Delivery" value="Delivery" />
        <Tab label="Payment" value="Payment" />
      </Tabs>

      {tabContent}
    </div>
  );
};

export default Cart;
