import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="form-page page-content">
      <section className="form-card">
        <p className="eyebrow">404</p>
        <h2>That page could not be found.</h2>
        <p>The address you entered does not match a ShopState page.</p>
        <Link className="primary-button link-button" to="/">Return to the shop</Link>
      </section>
    </main>
  );
}

export default NotFound;
