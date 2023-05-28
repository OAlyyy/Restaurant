import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { documentId, name, price, imageUrl } = action.payload;
            const existingProduct = state.products.find(product => product.documentId === documentId);
            if (existingProduct) {
              return { products: state.products.map(product => product.documentId === documentId ? { ...product, amount: product.amount + 1 } : product) };
            } else {
              const newProduct = { documentId, name, price, imageUrl, amount: 1 };
              return { products: [...state.products, newProduct] };
            }
          }
          ,
        clearCart: (state) => {
            return { products: []}
        },
        incrementProductAmount: (state, action) => {
            console.log('increment');
            return { products: state.products.map(product => product.documentId === action.payload.documentId ? {...product, amount: product.amount + 1} : product)}
        },
        decrementProductAmount: (state, action) => {
            return { products: state.products.map(product => product.documentId === action.payload.documentId ? {...product, amount: product.amount - 1} : product)}
        }
    }
})

export const cartProducts = state => state.cart.products

export const {  addToCart, clearCart, incrementProductAmount, decrementProductAmount } = cartSlice.actions

export default cartSlice.reducer