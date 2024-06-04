import { useDispatch } from "react-redux";
import React, { useState } from "react";
import {
  incrementProductAmount,
  decrementProductAmount,
} from "../../../store/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import "./Css/product.css";

export function totalProductPrice(product) {
  const ind =
    (parseFloat(product.price) + parseFloat(product.totalExtrasPrice)) *
    product.amount;
  return ind;
}

export const ProductsSummaryCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const [imageError, setImageError] = useState(false);
  const id = open ? "simple-popper" : undefined;

  if (product.amount === 0) {
    return null;
  }

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // Calculate total price including extras
  const totalProductPrice =
    (parseFloat(product.price) + parseFloat(product.totalExtrasPrice)) *
    product.amount;

  const handleImageError = () => {
    // Set image error state to true when image fails to load
    setImageError(true);
  };

  return (
    <div className="product-summary-card">
        <img
          src={imageError ? "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : product.imageUrl}
          alt={product.name}
          onError={handleImageError}
        />

      <div className="product-details">
        <div className="product-summary-name">{product.name}</div>
        <div className="product-summary-price">€{totalProductPrice.toFixed(2)}</div>
        <p className="product-summary-extras">
          Extras: {product.extras.map((extra) => `${extra.name}`).join(", ")}
        </p>
      </div>

      <div className="product-cart">
        <div className="quantityFlex">
          <IconButton onClick={() => dispatch(incrementProductAmount(product))}>
            <AddIcon />
          </IconButton>
          <div className="product-quantity">{product.amount}</div>
          <IconButton
            disabled={product.amount <= 0}
            onClick={() => dispatch(decrementProductAmount(product))}
          >
            <RemoveIcon />
          </IconButton>
        </div>
      </div>

    </div>
  );
};
