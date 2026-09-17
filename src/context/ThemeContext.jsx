// createContext creates a channel through which distant components can share theme information.
import { createContext, useContext, useState } from "react";

// null makes it possible for the custom Hook to detect a missing provider.
const ThemeContext = createContext(null);

// ThemeProvider owns the theme state and exposes the action that changes it.
export function ThemeProvider({ children }) {
  // The PDF uses light as the initial theme.
  const [theme, setTheme] = useState("light");

  // The functional update always works with the latest theme value.
  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  // The context value is available to every descendant component.
  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}

// useTheme hides the context implementation from components that consume it.
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return context;
}
