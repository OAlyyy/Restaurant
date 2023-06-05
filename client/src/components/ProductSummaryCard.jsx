import { useDispatch } from "react-redux";
import {
  incrementProductAmount,
  decrementProductAmount,
} from "../store/cart/cartSlice";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

export function totalPrice(product) {
  const ind = product.price * product.amount;
  return ind;
}

export const ProductsSummaryCard = ({ product }) => {
  const dispatch = useDispatch();

  const buttons = [
    <IconButton onClick={() => dispatch(incrementProductAmount(product))}>
      <AddIcon />
    </IconButton>,
    <IconButton
      disabled={product.amount <= 0}
      onClick={() => dispatch(decrementProductAmount(product))}
    >
      <RemoveIcon />
    </IconButton>,
  ];

  if (product.amount === 0) {
    return null;
  }
  return (
    <Grid container spacing={1} className="productsSummary">
      <Grid item xs={6} className="product-image-container">
        <img
          className="product-image"
          src={product.imageUrl}
          alt={product.name}
        />
      </Grid>

      <Grid item xs={3}>
        <h3>{product.name}</h3>
        <p>Qty: {product.amount}</p>
        <p>Price: {product.price * product.amount}</p>
      </Grid>

      <Grid item xs={3}>
      <IconButton onClick={() => dispatch(incrementProductAmount(product))}>
      <AddIcon />
    </IconButton>,
    <IconButton
      disabled={product.amount <= 0}
      onClick={() => dispatch(decrementProductAmount(product))}
    >
      <RemoveIcon />
    </IconButton>
      </Grid>
    </Grid>
  );
};
