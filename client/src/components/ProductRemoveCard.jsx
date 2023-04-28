import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import React, { useState } from "react";



export const ProductRemoveCard = ({ product, RemoveProduct }) => {


  const [products, setProducts] = useState([]);
  
   RemoveProduct = (productId) => {
    console.log(" 1111111 admin Deleting ");
    axios.delete(`http://localhost:3001/product/${productId}`).then(() => {
      setProducts(products.filter((product) => product.id !== productId));
      console.log("Deleting ");
    });
  };

  return (
    <div className="carousel-element">
      <img
        className="carousel-image"
        src={product.imageUrl}
        alt={product.name}
      />
      <h2 className="carousel-title">{product.name}</h2>
      <p className="carousel-desciption">{product.desciption}</p>
 
      
      <div>
    <Button
    variant="outlined" 
    startIcon={<DeleteIcon />}
    className="addProdctBttn"
      size="large"
      color="primary"
      aria-label="add to shopping cart"
      onClick={() => RemoveProduct(product.id)}
    >
    </Button>
  </div>;
    </div>
  );
};
