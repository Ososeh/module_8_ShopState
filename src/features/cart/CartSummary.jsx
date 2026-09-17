// CartSummary reads derived values from reusable Redux selectors.
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartCount, selectCartTotal } from "./cartSlice";
import { useAuth } from "../../context/AuthContext";

function CartSummary() {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const { recordActivity } = useAuth();

  return (
    <section className="cart-summary" aria-label="Cart summary">
      <div>
        <span>Total Items</span>
        <strong>{itemCount}</strong>
      </div>
      <div>
        <span>Total Price</span>
        <strong>₦{total.toLocaleString()}</strong>
      </div>
      <button
        className="clear-button"
        type="button"
        disabled={itemCount === 0}
        onClick={() => {
          dispatch(clearCart());
          recordActivity({ type: "cart-cleared", message: "Cleared the shopping cart." });
        }}
      >
        Clear Cart
      </button>
    </section>
  );
}

export default CartSummary;
