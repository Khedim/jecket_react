import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProducts = createAsyncThunk('productsSlicer/fetchProducts', async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/v1/latest-products')
    return res.data
})

export const productsSlicer = createSlice({
    name: 'productsSlicer',
    initialState: [{ id: 55, name: "product 55" }],
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return [...state, ...action.payload]
        })
    }
})

export const {} = productsSlicer.actions
export default productsSlicer.reducer
