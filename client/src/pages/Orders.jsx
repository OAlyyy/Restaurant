import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies  from "universal-cookie";
import {  useNavigate } from "react-router-dom";


const Orders = () => {

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get("jwt_authorization")) {
      navigate("/login");
    }
   }, // eslint-disable-next-line
   []);


  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/orders").then((response) => {
      const sortedOrders = response.data.sort(
        (a, b) => b.orderNumber - a.orderNumber
      );
      setOrders(sortedOrders);
    });
  }, []);

  return (
    <div className="ordersContainer">
      {orders.map((order) => (
        <div className="order" key={order.orderNumber}>
          <div className="orderHeader">
            <Link to={`/orders/${order.orderNumber}`}>
              <div className="orderNumber">Order #{order.orderNumber}</div>
            </Link>

            <div
              className={`orderStatus ${
                order.status === "ready" ? "ready" : "pending"
              }`}
            >
              {order.status}
            </div>
          </div>
          {order.items.map((product, index) => (
            <div key={index}>
              <div className="orderDetails">
                <div className="orderAmount">{product.amount}</div>
                <div className="orderName">{product.name}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
