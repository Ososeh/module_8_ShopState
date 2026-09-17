import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      register(form);
      navigate("/account", { replace: true });
    } catch (signupError) {
      setError(signupError.message);
    }
  }

  return (
    <main className="form-page page-content">
      <section className="form-card">
        <p className="eyebrow">Create your account</p>
        <h2>Start your ShopState journey</h2>
        <p>Create an account to save your cart and keep your shopping activity connected to you.</p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-two-column">
            <label>First name<input name="firstName" value={form.firstName} onChange={handleChange} required /></label>
            <label>Last name<input name="lastName" value={form.lastName} onChange={handleChange} required /></label>
          </div>
          <label>Email address<input name="email" value={form.email} onChange={handleChange} type="email" required /></label>
          <label>Password<input name="password" value={form.password} onChange={handleChange} type="password" required /></label>
          <button className="primary-button" type="submit">Create Account</button>
        </form>

        <p className="form-footer">Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  );
}

export default Signup;
