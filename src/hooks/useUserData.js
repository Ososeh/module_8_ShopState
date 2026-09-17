import { useEffect, useMemo, useState } from "react";

// localStorage is the browser's simple built-in storage area.
const USERS_KEY = "shopstate-users";
const SESSION_KEY = "shopstate-session";

function readUsers() {
  try {
    const savedUsers = localStorage.getItem(USERS_KEY);
    return savedUsers ? JSON.parse(savedUsers) : {};
  } catch (error) {
    console.warn("Could not read saved users.", error);
    return {};
  }
}

function readSessionEmail() {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch (error) {
    console.warn("Could not read the saved session.", error);
    return null;
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// This custom Hook keeps account information and user activity in one place.
export function useUserData() {
  const [users, setUsers] = useState(readUsers);
  const [sessionEmail, setSessionEmail] = useState(readSessionEmail);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const user = useMemo(() => {
    return sessionEmail ? users[sessionEmail] ?? null : null;
  }, [sessionEmail, users]);

  function registerUser({ firstName, lastName, email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    if (users[normalizedEmail]) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: crypto.randomUUID(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password,
      activities: [
        {
          id: crypto.randomUUID(),
          type: "account-created",
          message: "Account created successfully.",
          date: new Date().toISOString(),
        },
      ],
      cart: [],
    };

    const updatedUsers = { ...users, [normalizedEmail]: newUser };
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    setSessionEmail(normalizedEmail);
    localStorage.setItem(SESSION_KEY, normalizedEmail);
    console.log("New ShopState account created:", normalizedEmail);
    return newUser;
  }

  function loginUser(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = users[normalizedEmail];

    if (!existingUser || existingUser.password !== password) {
      throw new Error("Email or password is incorrect.");
    }

    setSessionEmail(normalizedEmail);
    localStorage.setItem(SESSION_KEY, normalizedEmail);
    console.log("ShopState user logged in:", normalizedEmail);
    return existingUser;
  }

  function logoutUser() {
    setSessionEmail(null);
    localStorage.removeItem(SESSION_KEY);
    console.log("ShopState user logged out.");
  }

  function updateCurrentUser(updates) {
    if (!sessionEmail) return;

    setUsers((currentUsers) => ({
      ...currentUsers,
      [sessionEmail]: {
        ...currentUsers[sessionEmail],
        ...updates,
      },
    }));
  }

  function recordActivity(activity) {
    if (!sessionEmail) return;

    const activityWithId = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      ...activity,
    };

    setUsers((currentUsers) => ({
      ...currentUsers,
      [sessionEmail]: {
        ...currentUsers[sessionEmail],
        activities: [
          activityWithId,
          ...(currentUsers[sessionEmail]?.activities ?? []),
        ],
      },
    }));
  }

  function saveCart(cart) {
    if (!sessionEmail) return;

    setUsers((currentUsers) => {
      const currentCart = currentUsers[sessionEmail]?.cart ?? [];

      // Avoid writing identical data repeatedly when React re-renders.
      if (JSON.stringify(currentCart) === JSON.stringify(cart)) {
        return currentUsers;
      }

      return {
        ...currentUsers,
        [sessionEmail]: {
          ...currentUsers[sessionEmail],
          cart,
        },
      };
    });
  }

  return {
    user,
    isLoggedIn: Boolean(user),
    registerUser,
    loginUser,
    logoutUser,
    updateCurrentUser,
    recordActivity,
    saveCart,
  };
}
