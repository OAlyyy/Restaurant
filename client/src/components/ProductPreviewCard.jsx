import { AddProduct } from "./AddProduct";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  const addProduct = () => {
    onAddProduct(product);
  };

  return (
    <div className="carousel-element">
      <a href="#" onClick={addProduct}>
        <img
          className="carousel-image"
          src={product.imageUrl}
          alt={product.imageUrl}
        />
      </a>
      <h2 className="carousel-title">{product.name}</h2>
      <p className="carousel-title">{product.price} €</p>
      <AddProduct className="addProdctBttn" onAddProduct={addProduct} />
    </div>
  );
};
