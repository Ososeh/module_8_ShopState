import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from || "/account";

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate(destination, { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    }
  }

  return (
    <main className="form-page page-content">
      <section className="form-card">
        <p className="eyebrow">Welcome back</p>
        <h2>Sign in to your ShopState account</h2>
        <p>Access your account details, saved cart, and recent shopping activity.</p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>
          <button className="primary-button" type="submit">Log In</button>
        </form>

        <p className="form-footer">New to ShopState? <Link to="/signup">Create an account</Link></p>
      </section>
    </main>
  );
}

export default Login;
