import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export const ProductRemoveCard = ({ product, RemoveProduct }) => {


  const [products, setProducts] = useState([]);
  const [deleteAlert , setDeleteAlert ] = useState(null);

   RemoveProduct = (productId) => {
    setDeleteAlert(true);
    axios.delete(`http://localhost:3001/product/${productId}`).then(() => {
      setProducts(products.filter((product) => product.id !== productId));

    });
  };

  return (
    
    <div className="carousel-element">
      {deleteAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">Product deleted!</Alert>
        </Stack>
      )} 
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
