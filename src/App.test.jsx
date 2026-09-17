import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppProviders from "./providers/AppProviders";

function renderApp(initialPath = "/") {
  window.history.pushState({}, "", initialPath);
  return render(
    <AppProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProviders>,
  );
}

beforeEach(() => {
  localStorage.clear();
  cleanup();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

test("public shop page renders product images and realistic content", () => {
  renderApp();

  expect(screen.getByRole("heading", { name: "ShopState" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Technology that fits the way you work, play, and create." })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Wireless over-ear headphones" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Mechanical computer keyboard" })).toBeInTheDocument();
});

test("unauthenticated visitors are redirected away from protected account page", () => {
  renderApp("/account");
  expect(screen.getByRole("heading", { name: "Sign in to your ShopState account" })).toBeInTheDocument();
});

test("user can create an account, log out, and log back in with saved information", async () => {
  const user = userEvent.setup();
  renderApp("/signup");

  await user.type(screen.getByLabelText("First name"), "Ada");
  await user.type(screen.getByLabelText("Last name"), "Okafor");
  await user.type(screen.getByLabelText("Email address"), "ada@example.com");
  await user.type(screen.getByLabelText("Password"), "secret123");
  await user.click(screen.getByRole("button", { name: "Create Account" }));

  expect(screen.getByRole("heading", { name: "Welcome back, Ada." })).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Log Out" }));
  expect(screen.getByRole("heading", { name: "Technology that fits the way you work, play, and create." })).toBeInTheDocument();

  await user.click(screen.getByRole("link", { name: "Log In" }));
  await user.type(screen.getByLabelText("Email address"), "ada@example.com");
  await user.type(screen.getByLabelText("Password"), "secret123");
  await user.click(screen.getByRole("button", { name: "Log In" }));

  expect(screen.getByRole("heading", { name: "Welcome back, Ada." })).toBeInTheDocument();
  expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  expect(screen.getByText("1 recorded activities")).toBeInTheDocument();
});

test("cart activity is retained for the correct account", async () => {
  const user = userEvent.setup();
  renderApp("/signup");

  await user.type(screen.getByLabelText("First name"), "Tunde");
  await user.type(screen.getByLabelText("Last name"), "Bello");
  await user.type(screen.getByLabelText("Email address"), "tunde@example.com");
  await user.type(screen.getByLabelText("Password"), "secret123");
  await user.click(screen.getByRole("button", { name: "Create Account" }));

  await user.click(screen.getAllByRole("button", { name: "Add to Cart" })[0]);
  await user.click(screen.getByRole("link", { name: /Cart \(1\)/ }));
  expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Log Out" }));
  await user.click(screen.getByRole("link", { name: "Log In" }));
  await user.type(screen.getByLabelText("Email address"), "tunde@example.com");
  await user.type(screen.getByLabelText("Password"), "secret123");
  await user.click(screen.getByRole("button", { name: "Log In" }));
  await user.click(screen.getByRole("link", { name: /Cart \(1\)/ }));

  expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
  expect(screen.getByText("Added Wireless Headphones to the cart.")).toBeInTheDocument();
});

test("keeps two users' information separate", async () => {
  const user = userEvent.setup();
  renderApp("/signup");

  await user.type(screen.getByLabelText("First name"), "Ada");
  await user.type(screen.getByLabelText("Last name"), "Okafor");
  await user.type(screen.getByLabelText("Email address"), "ada@example.com");
  await user.type(screen.getByLabelText("Password"), "secret123");
  await user.click(screen.getByRole("button", { name: "Create Account" }));
  await user.click(screen.getByRole("button", { name: "Log Out" }));

  await user.click(screen.getByRole("link", { name: "Log In" }));
  await user.click(screen.getByRole("link", { name: "Create an account" }));
  await user.type(screen.getByLabelText("First name"), "Chidi");
  await user.type(screen.getByLabelText("Last name"), "Mensah");
  await user.type(screen.getByLabelText("Email address"), "chidi@example.com");
  await user.type(screen.getByLabelText("Password"), "another123");
  await user.click(screen.getByRole("button", { name: "Create Account" }));
  expect(screen.getByRole("heading", { name: "Welcome back, Chidi." })).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Log Out" }));
  await user.click(screen.getByRole("link", { name: "Log In" }));
  await user.type(screen.getByLabelText("Email address"), "ada@example.com");
  await user.type(screen.getByLabelText("Password"), "secret123");
  await user.click(screen.getByRole("button", { name: "Log In" }));

  expect(screen.getByRole("heading", { name: "Welcome back, Ada." })).toBeInTheDocument();
  expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  expect(screen.queryByText("chidi@example.com")).not.toBeInTheDocument();
});

test("theme context still updates the interface", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole("button", { name: "🌙 Dark Mode" }));
  expect(screen.getByRole("button", { name: "☀️ Light Mode" })).toBeInTheDocument();
});
