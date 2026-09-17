import ProductList from "../components/ProductList";

function Home() {
  return (
    <main className="page-content">
      <section className="hero" aria-labelledby="hero-heading">
        <p className="eyebrow">Smart technology for everyday life</p>
        <h2 id="hero-heading">Technology that fits the way you work, play, and create.</h2>
        <p>
          Discover practical gadgets and accessories selected for focused work,
          entertainment, and everyday convenience.
        </p>
      </section>

      <section className="content-section story-section">
        <p className="eyebrow">Why ShopState</p>
        <h2>Useful technology, without the guesswork.</h2>
        <p>
          We focus on dependable everyday devices: comfortable audio, productive
          accessories, portable entertainment, and wearable technology. Each item is
          presented with clear information so you can decide what belongs in your setup.
        </p>
      </section>

      <ProductList />
    </main>
  );
}

export default Home;
