import { AddProduct } from "./AddProduct";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  const addProduct = () => {
    onAddProduct(product);
  };

  return (
    <div className="carousel-element">
      <img
        className="carousel-image"
        src={product.imageUrl}
        alt={product.imageUrl}
      />
      <h2 className="carousel-title">{product.name}</h2>
      <p className="carousel-desciption">{product.desciption}</p>
      <AddProduct className="addProdctBttn" onAddProduct={addProduct} />
    </div>
  );
};
