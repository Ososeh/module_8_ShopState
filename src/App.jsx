import { Navigate, Route, Routes } from "react-router-dom";
import ShopStateDashboard from "./components/ShopStateDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";

// App only describes the application's routes; page logic stays in separate components.
function App() {
  return (
    <Routes>
      <Route element={<ShopStateDashboard />}>
        {/* Public routes: anyone can visit these pages. */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes: ProtectedRoute checks authentication first. */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
