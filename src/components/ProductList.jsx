import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList() {
  return (
    <section className="products-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <p className="eyebrow">Featured collection</p>
        <h2 id="products-heading">Technology for your everyday setup</h2>
        <p>Explore a small selection of useful devices for focused work, entertainment, and life on the move.</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
