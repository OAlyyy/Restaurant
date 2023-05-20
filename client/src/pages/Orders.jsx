import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Orders = () => {
  const cookies = new Cookies();
  const jwtToken = cookies.get("jwt_authorization");

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(
    () => {
      if (!jwtToken) {
        navigate("/login");
      }
    }, // eslint-disable-next-line
    []
  );

  useEffect(() => {
    axios.get("http://localhost:3001/orders").then((response) => {
      const sortedOrders = response.data.sort(
        (a, b) => b.orderNumber - a.orderNumber
      );
      setOrders(sortedOrders);
    });
  }, []);

  const handleOrderReady = (orderId) => {
    axios
      .put(`http://localhost:3001/orders/orderStatus`, {
        newStatus: "ready",
        id: orderId,
      })
      .then((response) => {
        console.log(`Order ${orderId} is now ready!`);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

          <Button
            variant="contained"
            color="success"
            onClick={() => handleOrderReady(order.id)}
          >
            Order Ready
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
