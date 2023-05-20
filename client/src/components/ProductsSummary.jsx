import { useSelector } from "react-redux";
import { cartProducts } from "../store/cart/cartSlice";
import { ProductsSummaryCard } from "./ProductSummaryCard";

export const ProductsSummary = () => {
  const cart = useSelector(cartProducts);

  return (
    <div className="products-summary">
      {cart.map((product) => (
        <ProductsSummaryCard key={product.id} product={product} />
      ))}
    </div>
  );
};
