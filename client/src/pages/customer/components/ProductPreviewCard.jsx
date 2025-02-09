import ExtrasDialog from "../components/ExtrasDialog";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleExtrasSelected = (selectedData) => {
    handleAddToCart(
      selectedData.extras,
      selectedData.size,
      selectedData.totalExtrasPrice
    );
    console.log("selectedDataHOOME", selectedData);
  };

    const handleAddToCart = (extras, size, totalExtrasPrice )  => {
    if (product) {
      const productWithExtras = {
        ...product,
        extras: extras,
        size: size,
        totalExtrasPrice:totalExtrasPrice,
      };
      onAddProduct(productWithExtras);
      setSelectedProduct(null);
    }
  };

// Calculate isDrinksCategory based on the product's category
const isDrinksCategory = product && product.categoryId === "drinks";


  return (
    <div className="carousel-element">
      <img
        className="carousel-image"
        src={product.imageUrl}
        alt={product.imageUrl}
      />

      <h2 className="carousel-name">{product.name}</h2>
      <div className="carouselFooter">
        <p className="carousel-price">{product.price} €</p>

        <IconButton
          className="productPreviewBttn"
          style={{ color: "white" }}
          onClick={() => setSelectedProduct(product)}
        >
          <ShoppingCartIcon />
        </IconButton>
   
          <ExtrasDialog
            open={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onExtrasSelected={handleExtrasSelected}
            isDrinksCategory={isDrinksCategory}
          />
   
      </div>
    </div>
  );
};
