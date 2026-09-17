// configureStore creates the central Redux store and its standard development configuration.
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

// The cart slice owns the cart branch of the root Redux state.
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
