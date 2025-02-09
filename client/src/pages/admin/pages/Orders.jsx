import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { fetchOrders, updateOrderStatus } from "../../../firebase";
import"./Css/Orders.css"


const Orders = () => {
  const cookies = new Cookies();
  const jwtToken = cookies.get("jwt_authorization");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  }, [jwtToken, navigate]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await fetchOrders();
        const sortedOrders = orders.sort(
          (a, b) => b.orderNumber - a.orderNumber
        );
        setOrders(sortedOrders);
        console.log("sortedOrders:", sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);

  const handleOrderReady = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "ready");
      console.log(`Order ${orderId} is now ready!`);
      navigate(0);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="ordersContainer">
      {orders.map((order) => (
        <div className="order" key={order.documentId}>
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
          {Array.isArray(order.items) && order.items.length > 0 ? (
  order.items.map((product, index) => (
    <div key={index}>
     <div className="orderDetails">
  <div className="orderName">{String(product.name)}</div>
  <div className="orderSize">
    <span className="label">Size:</span> {product.size && product.size.length > 0 ? product.size[0].name : ""}
  </div>
  <div className="orderExtras">
    <span className="label">Extras:</span> {product.extras && product.extras.length > 0 ? product.extras.map(extra => extra.name).join(", ") : ""}
  </div>
</div>

    </div>
  ))
) : (
  <div className="emptyOrder">No items in this order.</div>
)}

<div className="bottomButtons">

    {order.status !== "ready" && (
            <Button
              variant="contained"
              color="success"
              className="orderReadyButton"
              onClick={() => handleOrderReady(order.documentId)}
            >
              Order Ready
            </Button>
          )}
</div>
        


        </div>
      ))}
    </div>
  );
};

export default Orders;
