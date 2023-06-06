import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const AddProduct = ({ onAddProduct }) => {
  return (
    <div>
      <IconButton
      className="addProductBttnHomePage"
        size="small"
        color="primary"
        aria-label="add to shopping cart"
        onClick={onAddProduct}
        style={{ color: 'white' }}
      >
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  );
};
