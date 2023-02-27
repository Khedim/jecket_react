import { createSlice } from "@reduxjs/toolkit";

export const cartSilcer = createSlice({
  name: "cartSilcer",
  initialState: {
    cart: {
      items: JSON.parse(localStorage.getItem("cartItems")) || [],
    },
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') || "",
  },
  reducers: {
    addToCart: (state, action) => {
      const found = state.cart.items.find((i) => i.id === action.payload.id);
      if (found) {
        found.quantity += parseInt(action.payload.quantity);
      } else {
        state.cart.items.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
    },
    minus: (state, action) => {
      const found = state.cart.items.find((i) => i.id === action.payload.id);
      found.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
    },
    removeFromCart: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
    },
    setToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
    },
    removeToken: (state) => {
      state.token = ''
      state.isAuthenticated = false
    },
  },
});

export const { addToCart, minus, removeFromCart, setToken, removeToken } = cartSilcer.actions;
export default cartSilcer.reducer;
