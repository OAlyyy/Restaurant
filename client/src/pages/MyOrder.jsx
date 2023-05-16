import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(`http://localhost:3001/orders/${orderNumber}`);
      setOrder(response.data);
    };
    fetchOrder();
  }, [orderNumber]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchOrder = async () => {
        const response = await axios.get(`http://localhost:3001/orders/${orderNumber}`);
        const newOrder = response.data;
        if (newOrder.status !== order.status) {
          setOrder(newOrder);
        }
      };
      fetchOrder();
    }, 30000 ); // check every 30 seconds
    return () => clearInterval(intervalId);
  }, [order, orderNumber]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="myorder">
      <div className="myorderHeader">
        <div className="myorderNumber">Order #{order.orderNumber}</div>
        <div
          className={`orderStatus ${
            order.status === "ready" ? "ready" : "pending"
          }`}
        >
          {order.status}
        </div>
      </div>
      {order.items.map((product, index) => (
        <div key={index} className="myorderItem">
          <img className="myorder-image" src={product.imageUrl} alt={product.imageUrl} />
        <div className="myorderDetails">
            <div className="myorderName">{product.name}</div>
            <div className="myorderAmount">Qty: {product.amount}</div>
            <div className="myorderprice">Sum: €{product.price * product.amount}</div>
          </div>
        </div>
      ))}
      <div className="myorderPrice"> Total :  {order.totalPrice}  €</div>
    </div>
  );
};

export default OrderDetail;
