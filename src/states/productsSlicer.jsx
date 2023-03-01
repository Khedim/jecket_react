import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProducts = createAsyncThunk('productsSlicer/fetchProducts', async () => {
    const res = await axios.get('latest-products')
    return res.data
})

export const productsSlicer = createSlice({
    name: 'productsSlicer',
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload
        })
    }
})


export default productsSlicer.reducer
