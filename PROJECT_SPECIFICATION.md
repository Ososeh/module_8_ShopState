# Module 8 — Updated Project Specification

The application continues to demonstrate the PDF's central ShopState requirement: use Context API for theme/user information and Redux Toolkit for cart state. The PDF identifies the project as an e-commerce cart and user-preferences application and requires duplicate prevention, quantity controls, removal, clearing, derived totals, empty-cart handling, reusable components, and avoidance of cart prop drilling.

## Added requirements from the requested revision

1. Every product contains an editable `image` property.
2. Product-card JSX reads the image from product data.
3. Website copy presents realistic e-commerce content rather than primarily describing state-management features.
4. Public routes are available without authentication.
5. Account and cart pages are protected by an authentication gate.
6. User accounts, activities, and saved carts persist between sessions through browser `localStorage`.
7. `useUserData` is the custom Hook responsible for user-related persistence and retrieval.
8. Redux cart state is restored for the currently authenticated user.
9. Cart actions are recorded as user activities.

## Learning note

This persistence is intentionally client-side and is suitable for demonstrating React state management. It is not a production authentication system: real applications should not store plaintext passwords in browser storage.
