import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useAuth } from "../context/AuthContext";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isLoggedIn, recordActivity } = useAuth();

  function handleAddToCart() {
    if (!isLoggedIn) return;

    dispatch(addToCart(product));
    recordActivity({
      type: "cart-added",
      message: `Added ${product.name} to the cart.`,
      productId: product.id,
    });
    console.log("Product added to cart:", product.name);
  }

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        {/* Change product.image in data/products.js to replace this picture. */}
        <img className="product-image" src={product.image} alt={product.imageAlt} />
      </div>
      <span className="product-category">{product.category}</span>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-card-footer">
        <strong>₦{product.price.toLocaleString()}</strong>
        <button onClick={handleAddToCart} disabled={!isLoggedIn}>
          {isLoggedIn ? "Add to Cart" : "Log in to Add"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
