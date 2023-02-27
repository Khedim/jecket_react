import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlicer'
import cartReducer from './cartSlicer'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    }
})
