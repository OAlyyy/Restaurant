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
      <h2 className="carousel-name">{product.name}</h2>
      <div className="carouselFooter">
        <p className="carousel-price">{product.price} €</p>
        <AddProduct onAddProduct={addProduct} />
      </div>
    </div>
  );
};
