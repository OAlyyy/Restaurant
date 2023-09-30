import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const ProductRemoveCard = ({ product, RemoveProduct }) => {
  const [deleteAlert, setDeleteAlert] = useState(null);

  const handleRemoveProduct = (documentId) => {
    setDeleteAlert(true);
    RemoveProduct(documentId);
  };

  return (
    <div className="carousel-element">
      {deleteAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">Product deleted!</Alert>
        </Stack>
      )}
      <img
        className="carousel-image"
        src={product.imageUrl}
        alt={product.name}
      />
      <h2 className="carousel-title">{product.name}</h2>
      <div className="addProdctBttn">
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
        
          size="large"
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => handleRemoveProduct(product.documentId)}
        ></Button>
      </div>
    </div>
  );
};
