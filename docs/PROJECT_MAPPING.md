# Module 8 — ShopState Project Mapping

This project follows the Module 8 PDF mini-project closely while keeping the parent/child organisation used in the earlier module projects.

## State responsibilities

- Local React state: temporary UI behaviour belongs inside the component that needs it.
- Theme Context: `theme` and `toggleTheme`.
- Auth Context: `user`, `isLoggedIn`, `login`, and `logout`.
- Redux Toolkit: cart items and cart update actions.
- Redux selectors: cart items, total quantity, and total price.

## Component hierarchy

```text
AppProviders
├── Redux Provider
├── ThemeProvider
└── AuthProvider
    └── App
        └── ShopStateDashboard
            ├── Navbar
            │   ├── ThemeToggle
            │   ├── UserMenu
            │   └── Cart indicator
            ├── ProductList
            │   └── ProductCard
            └── Cart
                ├── CartItem
                └── CartSummary
```

## Module 8 concepts demonstrated

- Context creation and providers.
- `useContext` through custom `useTheme` and `useAuth` Hooks.
- Multiple providers.
- Redux store with `configureStore`.
- Redux `Provider`.
- `createSlice`.
- Action payloads.
- Five cart reducers.
- `useSelector` and `useDispatch`.
- Exported selectors and derived state.
- Array updates and duplicate prevention.
- Empty-state rendering.
- Responsive styling.
- Feature-based Redux organisation.
- Redux DevTools support through standard `configureStore` development configuration.

The project intentionally does not add optional features such as `createAsyncThunk`, API loading, persistence, favourites, checkout, or protected routes because they are optional improvements in the PDF rather than required ShopState features.
