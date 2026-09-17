// Cart owns the cart section and selects the source item array from Redux.
import { useSelector } from "react-redux";
import { selectCartItems } from "./cartSlice";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function Cart() {
  const items = useSelector(selectCartItems);

  return (
    <section className="cart-section" aria-labelledby="cart-heading">
      <div className="section-heading">
        <p className="eyebrow">Shopping Cart</p>
        <h2 id="cart-heading">Your Selected Items</h2>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty.</h3>
          <p>Add a product above to begin shopping.</p>
        </div>
      ) : (
        <div className="cart-list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}

      <CartSummary />
    </section>
  );
}

export default Cart;
