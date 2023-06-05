import Button from "@mui/material/Button";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const ProductEditCard = ({ product, onEditProduct }) => {
  const [editField, setEditField] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [editedAlert, setEditedAlert] = useState(null);


  const handleEditFieldChange = (event) => {
    setEditField(event.target.value);
  };

  const handleEditedValueChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleProductEdit = async (documentId, editField, editedValue) => {
    try {
    await onEditProduct(documentId, editField, editedValue);

      // Update the editedAlert state or perform any other necessary actions
      setEditedAlert("Product edited successfully");
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="carousel-element">
      <img
        className="carousel-image"
        src={product.imageUrl}
        alt={product.name}
      />
      <h2 className="carousel-title">{product.name}</h2>
      <div className="carousel-title">{product.description}</div>
      <div className="carousel-title">{product.price}</div>

      <select value={editField} onChange={handleEditFieldChange}>
        <option value="">Select a field to edit</option>
        <option value="price">Price</option>
        <option value="description">Description</option>
        <option value="name">Name</option>
        <option value="categoryId">Category</option>
        <option value="imageUrl">Image URL</option>
      </select>
      {editField && (
        <input
          type="text"
          value={editedValue}
          onChange={handleEditedValueChange}
          placeholder={`Enter new ${editField}`}
        />
      )}
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleProductEdit(product.documentId, editField, editedValue)}
           disabled={!editField || !editedValue}
        >
          Save Changes
        </Button>
      </Stack>
      {editedAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{editedAlert}</Alert>
        </Stack>
      )}
    </div>
  );
};
