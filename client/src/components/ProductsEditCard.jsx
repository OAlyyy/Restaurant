import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const ProductEditCard  = ({ product, onEditProduct  }) => {
    const [editField, setEditField] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [editedAlert, setEditedAlert] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  

  const handleEditFieldChange = (event) => {
    setEditField(event.target.value);
    setSelectedAlert(true);
  };

  const handleEditedValueChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleProductEdit = () => {
    // Perform the necessary logic to update the product
    console.log("Edited product:", product);
    console.log("Edit field:", editField);
    // Update the specific field in the product object based on the selected editField
    // For example:
    if (editField === "name") {
      product.name = "Updated name";
    } else if (editField === "price") {
      product.price = "Updated price";
    } else if (editField === "description") {
      product.description = "Updated description";
    } else if (editField === "category") {
      product.category = "Updated category";
    } else if (editField === "imageUrl") {
      product.imageUrl = "Updated imageUrl";
    }
    onEditProduct(product);
  };

  return (
    <div className="carousel-element">
      {selectedAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">Product Selected!</Alert>
        </Stack>
      )}
      <img
        className="carousel-image"
        src={product.imageUrl}
        alt={product.name}
      />
      <h2 className="carousel-title">{product.name}</h2>
      <div>
      <select value={editField} onChange={handleEditFieldChange}>
          <option value="">Select a field to edit</option>
          <option value="price">Price</option>
          <option value="description">Description</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
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
        <Button variant="contained" onClick={handleProductEdit} disabled={!editField || !editedValue}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
