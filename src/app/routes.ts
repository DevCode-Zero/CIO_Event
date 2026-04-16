import { createBrowserRouter } from "react-router";
import { GuestApp } from "./pages/GuestApp";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: GuestApp,
  },
  {
    path: "/admin",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
]);
