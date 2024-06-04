import React, { useState } from "react";
import ExtrasDialog from "../components/ExtrasDialog";
import './Css/product.css';
import { useDispatch, useSelector } from "react-redux";
import {
  decrementProductAmount,
} from "../../../store/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

const ProductDetailCard = ({ product, onAddProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const handleExtrasSelected = (selectedData) => {
    handleAddToCart(selectedData.extras, selectedData.size, selectedData.totalExtrasPrice);
    console.log("selectedDataMENU", selectedData);
  };

  const handleAddToCart = (extras, size, totalExtrasPrice) => {
    if (product) {
      console.log("menuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", totalExtrasPrice);
      const productWithExtras = {
        ...product,
        extras: extras,
        size: size,
        totalExtrasPrice: totalExtrasPrice,
      };
      console.log("productWithExtras", productWithExtras);
      onAddProduct(productWithExtras);
      setSelectedProduct(null);
    }
  };

  const isDrinksCategory = product && product.categoryId === "drinks";

  // Access the quantity from the Redux store
  const quantity = useSelector(state => {
    console.log("state.cart.products:", state.cart.products); // Log state.cart.products
    console.log("product.documentId:", product.documentId); // Log product.documentId
    if (Array.isArray(state.cart.products)) {
      const cartItem = state.cart.products.find(item => item.documentId === product.documentId);
      console.log("cartItem:", cartItem); // Log the found cart item
      return cartItem ? cartItem.amount : 0;
    }
    console.log("state.cart.products is not an array"); // Log if state.cart.products is not an array
    return 0; // Default to 0 if state.cart.products is not an array
  });

  return (
    <div className="product-card">
      <img 
        src={imageError ? "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : product.imageUrl}
        alt={product.name}
        onError={() => setImageError(true)} 
      />
      <div className="product-details">
        <div className="product-name">{product.name}</div>
        <div className="product-price">€{product.price}</div>
        <div className="product-quantity">Qty: {quantity}</div> {/* Display quantity */}
      </div>

      <div className="product-cart">
        <div className="quantityFlex">
          <IconButton onClick={() => { setSelectedProduct(selectedProduct === product ? null : product); }}>
            <AddIcon />
          </IconButton>
          <IconButton
            disabled={quantity <= 0}
            onClick={() => dispatch(decrementProductAmount(product))}
          >
            <RemoveIcon />
          </IconButton>
        </div>
        <ExtrasDialog
          open={!!selectedProduct && selectedProduct === product}
          onClose={() => setSelectedProduct(null)}
          onExtrasSelected={handleExtrasSelected}
          isDrinksCategory={isDrinksCategory}
        />
      </div>
    </div>
  );
};

export default ProductDetailCard;
