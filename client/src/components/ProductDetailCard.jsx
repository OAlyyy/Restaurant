import Button from "@mui/material/Button";
import ExtrasDialog from "../components/ExtrasDialog";
import { useState } from "react";

const ProductDetailCard = ({ product, onAddProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleExtrasSelected = (selectedData) => {
    handleAddToCart(selectedData.extras, selectedData.size);
    console.log("selectedData",selectedData)

  };

  const handleAddToCart = (extras, size)  => {
    if (product) {
      const productWithExtras = {
        ...product,
        extras: extras,
        size: size,
      };
      console.log("productWithExtras",productWithExtras)
      onAddProduct(productWithExtras);
      setSelectedProduct(null);
    }
  };

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
      />

      </div>
    </div>
  );
};

export default ProductDetailCard;
