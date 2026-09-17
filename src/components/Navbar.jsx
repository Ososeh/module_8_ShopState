import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

function Navbar() {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="navbar">
      <div className="brand">
        <h1>ShopState</h1>
        <p>Everyday technology, thoughtfully selected.</p>
      </div>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Shop</NavLink>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
      </nav>
      <div className="navbar-actions">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}

export default Navbar;
