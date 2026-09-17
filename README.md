# Module 8 — ShopState E-Commerce Application

This project is a beginner-friendly implementation of the Module 8 ShopState mini-project. It demonstrates **Context API + Redux Toolkit together**, while also extending the classroom project with public/protected routing and persistent user accounts.

## Main features

- Public shop homepage with realistic e-commerce content.
- Product cards with editable `image` URLs in `src/data/products.js`.
- React Context for theme and authentication.
- Redux Toolkit for cart items, quantities, totals, and clearing the cart.
- Public routes: `/`, `/login`, `/signup`.
- Protected routes: `/account` and `/cart`.
- Account creation and login using browser `localStorage` for this learning project.
- User-specific cart persistence and activity history.
- Custom Hook: `src/hooks/useUserData.js` manages account data, sessions, activity, and saved carts.
- Minimal `App.jsx` containing route configuration only.
- Responsive styling.

## How to change a product image

Open `src/data/products.js`. Each product has an `image` property:

```js
{
  id: 1,
  name: "Wireless Headphones",
  image: "https://example.com/my-headphones.jpg",
}
```

Replace only the URL between the quotation marks. `ProductCard.jsx` reads that value with `product.image`, so you do not need to edit the JSX when changing pictures.

## Run the project

```bash
npm install
npm run dev
```

Then open the local address printed by Vite.

## Verification

`npm run check` performs a dependency-free structural check. `npm test`, `npm run lint`, and `npm run build` require the npm dependencies to be installed.
