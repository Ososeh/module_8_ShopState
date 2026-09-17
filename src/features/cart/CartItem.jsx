// CartItem controls one Redux cart entry.
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { recordActivity } = useAuth();

  return (
    <article className="cart-item">
      <div>
        <h3>{item.name}</h3>
        <p>₦{item.price.toLocaleString()} × {item.quantity}</p>
      </div>

      <div className="quantity-actions" aria-label={`Controls for ${item.name}`}>
        <button
          type="button"
          aria-label={`Decrease ${item.name}`}
          onClick={() => {
            dispatch(decreaseQuantity(item.id));
            recordActivity({ type: "cart-updated", message: `Decreased ${item.name} quantity.` });
          }}
        >
          −
        </button>
        <span aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          aria-label={`Increase ${item.name}`}
          onClick={() => {
            dispatch(increaseQuantity(item.id));
            recordActivity({ type: "cart-updated", message: `Increased ${item.name} quantity.` });
          }}
        >
          +
        </button>
        <button
          className="remove-button"
          type="button"
          onClick={() => {
            dispatch(removeFromCart(item.id));
            recordActivity({ type: "cart-removed", message: `Removed ${item.name} from the cart.` });
          }}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
