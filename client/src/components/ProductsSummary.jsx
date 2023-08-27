import { useSelector } from "react-redux";
import { cartProducts } from "../store/cart/cartSlice";
import { ProductsSummaryCard } from "./ProductSummaryCard";

export const ProductsSummary = () => {
  const cart = useSelector(cartProducts);

  return (
    <div >
      {cart.map((product, index) => (
        <ProductsSummaryCard key={`${product.documentId}-${index}`} product={product} />
      ))}
    </div>
  );
};
