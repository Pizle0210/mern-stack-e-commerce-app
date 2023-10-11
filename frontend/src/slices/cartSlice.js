import { createSlice } from "@reduxjs/toolkit";
import { cartUpdate } from "../utilities/cartUtil";

const getCartDataFromLocalStorage = () => {
  return localStorage.getItem("cart");
};

const initialState = getCartDataFromLocalStorage() ? JSON.parse(getCartDataFromLocalStorage()) : { cartItems: [], paymentMethod: "PayPal", shippingAddress: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      cartUpdate(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      cartUpdate(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      cartUpdate(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      cartUpdate(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      cartUpdate(state);
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
