import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, setCart } from "../features/cart/cartSlice";

function ShopStateDashboard() {
  const { theme } = useTheme();
  const { user, isLoggedIn, saveCart } = useAuth();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [cartOwner, setCartOwner] = useState(null);

  // First load the cart that belongs to the current account.
  useEffect(() => {
    if (user) {
      dispatch(setCart(user.cart ?? []));
      setCartOwner(user.email);
      console.log("Restored saved cart for:", user.email);
      return;
    }

    dispatch(setCart([]));
    setCartOwner(null);
  }, [dispatch, user?.email]);

  // After restoration, keep the user-specific cart saved for the next visit.
  useEffect(() => {
    if (isLoggedIn && user?.email === cartOwner) {
      saveCart(cartItems);
    }
  }, [cartItems, cartOwner, isLoggedIn, saveCart, user]);

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default ShopStateDashboard;
