// createSlice generates Redux action creators and the cart reducer from one feature definition.
import { createSlice } from "@reduxjs/toolkit";

// Only the source cart items are stored. Counts and totals are derived with selectors.
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart uses a product payload. Existing products receive a quantity increase.
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({ ...product, quantity: 1 });
    },

    // increaseQuantity receives a product id through action.payload.
    increaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    // decreaseQuantity lowers quantity and removes an item when quantity reaches zero.
    decreaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (!item) return;

      if (item.quantity === 1) {
        state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
        return;
      }

      item.quantity -= 1;
    },

    // removeFromCart deletes an item regardless of its current quantity.
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // clearCart restores the cart to its empty source state.
    clearCart(state) {
      state.items = [];
    },

    // Replace the Redux cart with the cart saved for the logged-in user.
    setCart(state, action) {
      state.items = action.payload ?? [];
    },
  },
});

// createSlice generates these action creators from the reducer names above.
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  setCart,
} = cartSlice.actions;

// Selectors keep the Redux state shape and repeated calculations out of UI components.
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

// The default export is the reducer added to configureStore.
export default cartSlice.reducer;
