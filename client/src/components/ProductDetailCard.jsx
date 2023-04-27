import Button from "@mui/material/Button";

const ProductDetailCard = ({ product, onAddProduct }) => {
  return (
     
    <div className="product-card">
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <img src={product.imageUrl} alt={product.name} />
    <div className="product-cart">
      <div className="product-price" >{product.price}</div>
  
      <Button className="product-button" onClick={onAddProduct(product)}>Add to Cart</Button>
    </div>
  </div>
    

  )

 
}


export default ProductDetailCard;
