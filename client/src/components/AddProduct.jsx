import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const AddProduct = ({ onAddProduct }) => {
  return (
    <div>
      <IconButton
        size="large"
        color="primary"
        aria-label="add to shopping cart"
        onClick={onAddProduct}
      >
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  );
};
