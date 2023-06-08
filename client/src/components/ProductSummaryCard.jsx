import { useDispatch } from "react-redux";
import {
  incrementProductAmount,
  decrementProductAmount,
} from "../store/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import * as React from "react";

export function totalPrice(product) {
  const ind = product.price * product.amount;
  return ind;
}

export const ProductsSummaryCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  if (product.amount === 0) {
    return null;
  }

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

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
          <div>
            <IconButton
              onClick={handleClick}
              size="small"
              style={{ padding: 4 }}
            >
              <InfoIcon />
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                <p>Extras: {product.extras.join(", ")}</p>
                <p>Size: {product.size}</p>
              </Box>
            </Popper>
          </div>
        </div>

        <div className="quantityFlex">
          <IconButton onClick={() => dispatch(incrementProductAmount(product))}>
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
