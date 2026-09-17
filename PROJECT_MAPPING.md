# Module 8 Project Mapping

## State responsibilities

| State | Owner | Reason |
|---|---|---|
| Theme | ThemeContext | Shared UI preference used by distant components |
| Current user/session | AuthContext + useUserData | Shared authentication and account information |
| User accounts/activity/saved cart | useUserData | Persistent user-specific information |
| Cart items/quantities | Redux Toolkit | Structured shared application state |
| Cart count/total | Redux selectors | Derived state should not be stored twice |
| Form input | Login/Signup local state | Only the form needs it |

## Component communication

`App.jsx`
→ route configuration

`ShopStateDashboard`
→ shared page shell, Navbar, and user-specific cart persistence

`Navbar`
→ navigation + ThemeToggle + UserMenu + Redux cart count

`Home`
→ ProductList

`ProductList`
→ ProductCard

`ProductCard`
→ reads product data, dispatches `addToCart`, records user activity

`ProtectedRoute`
→ checks AuthContext before rendering protected pages

`Account`
→ reads the authenticated user and activity history from AuthContext

`CartPage`
→ Cart → CartItem + CartSummary

`CartItem` / `CartSummary`
→ dispatch Redux actions and record user activity

## Persistent data flow

1. Signup creates a user record in `localStorage`.
2. The user's email is stored as the current session.
3. AuthContext exposes that user to the application.
4. The Redux cart is restored from that user's saved cart.
5. Cart changes are copied back to that user's record.
6. Activity entries are stored under that same user record.
7. Logout removes only the active session, not the account record.
8. A later login finds the same email and restores the same account information.
