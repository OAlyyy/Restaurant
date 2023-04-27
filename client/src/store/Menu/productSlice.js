import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    products: [],
    error: null,
    status: 'idle',
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.products = action.payload ? [...action.payload] : [];
            console.log('state =>', state.products);
        });
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = 'pending'
        })
    }
})

export const { getProducts } = productsSlice.actions

export default productsSlice.reducer

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    console.log("i am here fetch products productslice ")
    const response = await axios.get('http://localhost:3001/product')
    console.log("data =>",response)
    const data = response.data
    console.log("response.data =>",response.data)
    return data
    
})

export const selectAllProducts = state => state.products;