import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserMenu() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  if (!isLoggedIn) {
    return <Link className="user-button link-button" to="/login">Log In</Link>;
  }

  return (
    <div className="user-menu">
      <div>
        <strong>{user.firstName} {user.lastName}</strong>
        <small>{user.email}</small>
      </div>
      <button className="user-button" onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default UserMenu;
