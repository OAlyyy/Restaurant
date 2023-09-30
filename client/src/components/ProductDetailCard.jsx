import Button from "@mui/material/Button";
import ExtrasDialog from "../components/ExtrasDialog";
import { useState } from "react";

const ProductDetailCard = ({ product, onAddProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleExtrasSelected = (selectedData) => {
    handleAddToCart(selectedData.extras, selectedData.size,selectedData.totalExtrasPrice);
    console.log("selectedDataMENU",selectedData)

  };

  const handleAddToCart = (extras, size, totalExtrasPrice)  => {
     if (product) {

      console.log("menuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",totalExtrasPrice)


     // Create a new product object with the updated price and other properties
      const productWithExtras = {
        ...product,
        extras: extras,
        size: size,
        totalExtrasPrice:totalExtrasPrice,
      };
      console.log("productWithExtras",productWithExtras)
      onAddProduct(productWithExtras);
      setSelectedProduct(null);
    }
  };


  // Calculate isDrinksCategory based on the product's category
const isDrinksCategory = product && product.categoryId === "drinks";

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-cart">
        <div className="product-price">{product.price} €</div>

        <Button variant="contained" color="error" onClick={() => setSelectedProduct(product)}>
          Add to Cart
        </Button>

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

export default ProductDetailCard;
