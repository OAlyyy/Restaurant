import { useDispatch } from "react-redux";
import {
  incrementProductAmount,
  decrementProductAmount,
} from "../store/cart/cartSlice";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

export function totalPrice(product) {
  const ind = product.price * product.amount;
  return ind;
}

export const ProductsSummaryCard = ({ product }) => {
  const dispatch = useDispatch();

  if (product.amount === 0) {
    return null;
  }
  return (
    <div className="product-summary-card">
      <div className="product-summary-image">
        <img
          className="product-image"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      <div className="product-summary-content">
        <div className="product-summary-info">
          <h3>{product.name}</h3>
          <p>Qty: {product.amount}</p>
          <p>Price: {(product.price * product.amount).toFixed(2)}</p>

       </div>

          <div className="quantityFlex">
            <IconButton
              onClick={() => dispatch(incrementProductAmount(product))}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              disabled={product.amount <= 0}
              onClick={() => dispatch(decrementProductAmount(product))}
            >
              <RemoveIcon />
            </IconButton>
         
        </div>
      </div>
    </div>
  );
};
