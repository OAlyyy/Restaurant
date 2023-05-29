import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../firebase";

// Define the async thunk
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await fetchProducts(); // Replace with your actual API call or Firebase fetching logic
    return products;
  }
);

const initialState = {
  products: [],
  error: null,
  status: 'idle',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.products = action.payload ? [...action.payload] : [];
      console.log('state =>', state.products);
    });
    builder.addCase(fetchProductsAsync.pending, (state, action) => {
      state.status = 'pending';
    });
  }
});

export const { getProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = state => state.products;
