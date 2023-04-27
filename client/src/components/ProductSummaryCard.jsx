import { useDispatch } from "react-redux";
import {
  incrementProductAmount,
  decrementProductAmount,
} from "../store/cart/cartSlice";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export function totalPrice(product) {
  const ind = product.price * product.amount;
  return ind;
}

export const ProductsSummaryCard = ({ product }) => {
  const dispatch = useDispatch();

  const buttons = [
    <Button
      key="+"
      onClick={() => dispatch(incrementProductAmount(product))}
    >
      +
    </Button>,
    <Button key="-"  disabled={product.amount <= 0} onClick={() => dispatch(decrementProductAmount(product))}>
      -
    </Button>,
  ];


  if(product.amount=== 0){
    return null;
  }
  return (
    <>
      <div className="product-summary-card ">
        <div className="product-summary-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-summary-info">
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
        <div className="product-price-qt">
          <div className="price">{`${product.price * product.amount}$`}</div>
          <div className="quantity flex">
            <Box
              sx={{
                display: "flex",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
               {buttons}
              </ButtonGroup>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};
