import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("Adding to cart:", action.payload);
      const {
        documentId,
        name,
        price,
        imageUrl,
        size,
        extras,
        totalExtrasPrice,
      } = action.payload;
      
      // Check if the product exists in the cart with the same size and extras
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product.documentId === documentId &&
          product.size === size &&
          JSON.stringify(product.extras) === JSON.stringify(extras)
      );
    
      if (existingProductIndex !== -1) {
        // If the product exists, increment the amount by 1
        state.products[existingProductIndex].amount += 1;
      } else {
        // If the product does not exist, add it to the cart
        state.products.push({
          documentId,
          name,
          price,
          imageUrl,
          amount: 1,
          size,
          extras,
          totalExtrasPrice,
        });
      }
    },    
    clearCart: (state) => {
      return { products: [] };
    },
    incrementProductAmount: (state, action) => {
      console.log("increment");
      return {
        products: state.products.map((product) =>
          product.documentId === action.payload.documentId
            ? { ...product, amount: product.amount + 1 }
            : product
        ),
      };
    },
    decrementProductAmount: (state, action) => {
      return {
        products: state.products.map((product) =>
          product.documentId === action.payload.documentId
            ? { ...product, amount: product.amount - 1 }
            : product
        ),
      };
    },
  },
});

export const cartProducts = (state) => state.cart.products;

export const {
  addToCart,
  clearCart,
  incrementProductAmount,
  decrementProductAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
