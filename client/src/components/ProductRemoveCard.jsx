import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductRemoveCard = ({ product, onRemoveProduct }) => {

  const RemoveProduct = () => {
    onRemoveProduct(product);
  };

  return (
    <div className="carousel-element">
      <img
        className="carousel-image"
        src={product.imageUrl}
        alt={product.name}
      />
      <h2 className="carousel-title">{product.name}</h2>
      <p className="carousel-desciption">{product.desciption}</p>
 
      
      <div>
    <Button
    variant="outlined" 
    startIcon={<DeleteIcon />}
    className="addProdctBttn"
      size="large"
      color="primary"
      aria-label="add to shopping cart"
      onClick={onRemoveProduct}
      onRemoveProduct={RemoveProduct} 
    >
    </Button>
  </div>;
    </div>
  );
};
