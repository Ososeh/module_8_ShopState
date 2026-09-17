import { createContext, useContext } from "react";
import { useUserData } from "../hooks/useUserData";

// AuthContext shares account and login information with components that need it.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // The custom Hook contains the actual account persistence logic.
  const userData = useUserData();

  const value = {
    user: userData.user,
    isLoggedIn: userData.isLoggedIn,
    register: userData.registerUser,
    login: userData.loginUser,
    logout: userData.logoutUser,
    updateUser: userData.updateCurrentUser,
    recordActivity: userData.recordActivity,
    saveCart: userData.saveCart,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
