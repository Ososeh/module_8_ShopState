// Provider components are grouped here so main.jsx remains easy to read.
import { Provider } from "react-redux";
import { store } from "../app/store";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

// AppProviders combines Redux and the two Context providers required by the project.
function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default AppProviders;
