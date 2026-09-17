import Cart from "../features/cart/Cart";

function CartPage() {
  return (
    <main className="page-content">
      <section className="account-header">
        <p className="eyebrow">Your shopping bag</p>
        <h2>Review the products you selected.</h2>
        <p>Adjust quantities or remove products before you decide what to buy.</p>
      </section>
      <Cart />
    </main>
  );
}

export default CartPage;
