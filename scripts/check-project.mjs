import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "src/App.jsx",
  "src/hooks/useUserData.js",
  "src/routes/ProtectedRoute.jsx",
  "src/pages/Home.jsx",
  "src/pages/Login.jsx",
  "src/pages/Signup.jsx",
  "src/pages/Account.jsx",
  "src/pages/CartPage.jsx",
  "src/components/ProductCard.jsx",
  "src/data/products.js",
  "src/features/cart/cartSlice.js",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const app = fs.readFileSync(path.join(root, "src/App.jsx"), "utf8");
const products = fs.readFileSync(path.join(root, "src/data/products.js"), "utf8");
const card = fs.readFileSync(path.join(root, "src/components/ProductCard.jsx"), "utf8");
const hook = fs.readFileSync(path.join(root, "src/hooks/useUserData.js"), "utf8");
const routes = fs.readFileSync(path.join(root, "src/routes/ProtectedRoute.jsx"), "utf8");
const slice = fs.readFileSync(path.join(root, "src/features/cart/cartSlice.js"), "utf8");

if (!app.includes("<Routes>") || !app.includes("<ProtectedRoute />")) {
  throw new Error("App.jsx does not define the expected public/protected route structure.");
}
if (!products.includes("image:") || !card.includes("product.image")) {
  throw new Error("Product image data flow is missing.");
}
if (!hook.includes("localStorage") || !hook.includes("recordActivity") || !hook.includes("saveCart")) {
  throw new Error("Persistent user custom Hook requirements are missing.");
}
if (!routes.includes("Navigate") || !routes.includes("isLoggedIn")) {
  throw new Error("Protected route guard requirements are missing.");
}
for (const token of ["addToCart", "increaseQuantity", "decreaseQuantity", "removeFromCart", "clearCart", "setCart", "selectCartCount", "selectCartTotal"]) {
  if (!slice.includes(token)) throw new Error(`Redux cart token missing: ${token}`);
}

console.log("PASS: Module 8 updated structure, product image data flow, persistence Hook, protected routes, and Redux cart checks passed.");
