import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrder } from "../firebase.js";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

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
        <OrderItem key={index} product={product} />
      ))}
      <div className="myorderTotalPrice"> Total : {order.totalPrice} €</div>
    </div>
  );
};

const OrderItem = ({ product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? `simple-popper-${product.id}` : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className="myorderItem">
      <img
        className="myorder-image"
        src={product.imageUrl}
        alt={product.imageUrl}
      />
      <div className="myorderDetails">
        <div className="myorderName">{product.name}</div>
        <div className="myorderAmount">Qty: {product.amount}</div>
        <div className="myorderprice">
          Sum: €
          {parseFloat(product.price) +
            parseFloat(product.totalExtrasPrice) * product.amount}
        </div>

        <div>
          <IconButton onClick={handleClick} size="small" style={{ padding: 4 }}>
            <InfoIcon />
          </IconButton>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              <p>Size:</p>
              <ul>
                {product.size.map((size, index) => (
                  <li key={index}>
                    {size.name}: {size.price} €
                  </li>
                ))}
              </ul>
              <p>Extras:</p>
              <ul>
                {product.extras.map((extra, index) => (
                  <li key={index}>
                    {extra.name}: {extra.price} €
                  </li>
                ))}
              </ul>
            </Box>
          </Popper>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
