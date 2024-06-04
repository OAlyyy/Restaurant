import { useSelector } from "react-redux";
import { cartProducts } from "../../../store/cart/cartSlice";
import { ProductsSummaryCard } from "./ProductSummaryCard";

export const ProductsSummary = () => {
  const cart = useSelector(cartProducts);

  const styles = `
    .products-summary-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 20px; /* Adjust the top padding as needed */
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="products-summary-container">
        {cart.map((product, index) => (
          <ProductsSummaryCard key={`${product.documentId}-${index}`} product={product} />
        ))}
      </div>
    </>
  );
};
