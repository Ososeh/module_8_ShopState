import { describe, expect, test } from "vitest";
import reducer, {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setCart,
  selectCartCount,
  selectCartTotal,
} from "./cartSlice";

const product = { id: 1, name: "Keyboard", price: 38000, category: "Accessories" };

function rootState(items) {
  return { cart: { items } };
}

describe("cartSlice", () => {
  test("adds a product and prevents duplicate entries", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, addToCart(product));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  test("increases and decreases quantity", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, increaseQuantity(1));
    expect(state.items[0].quantity).toBe(2);

    state = reducer(state, decreaseQuantity(1));
    expect(state.items[0].quantity).toBe(1);
  });

  test("removes an item when quantity is decreased from one", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, decreaseQuantity(1));
    expect(state.items).toEqual([]);
  });

  test("supports remove and clear actions", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, removeFromCart(1));
    expect(state.items).toEqual([]);

    state = reducer(undefined, addToCart(product));
    state = reducer(state, clearCart());
    expect(state.items).toEqual([]);
  });

  test("selectors calculate derived count and total", () => {
    const items = [{ ...product, quantity: 2 }];
    const state = rootState(items);

    expect(selectCartCount(state)).toBe(2);
    expect(selectCartTotal(state)).toBe(76000);
  });
});


test("restores a saved user cart", () => {
  const savedCart = [{ id: 2, name: "Keyboard", price: 38000, quantity: 2 }];
  const state = cartReducer(undefined, setCart(savedCart));

  expect(state.items).toEqual(savedCart);
});
