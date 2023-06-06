import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrder } from "../firebase.js";

const OrderDetail = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      const fetchedOrder = await fetchOrder(orderNumber);
      setOrder(fetchedOrder);
    };
    getOrder();
  }, [orderNumber]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const getOrder = async () => {
        const fetchedOrder = await fetchOrder(orderNumber);
        if (fetchedOrder && (!order || fetchedOrder.status !== order.status)) {
          setOrder(fetchedOrder);
        }
      };
      getOrder();
    }, 30000); // check every 30 seconds
    return () => clearInterval(intervalId);
  }, [order, orderNumber]);

  if (!order) {
    return <div>Loading Your Order</div>;
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
      <div className="myorderTotalPrice"> Total :  {order.totalPrice}  €</div>
    </div>
  );
};

export default OrderDetail;
