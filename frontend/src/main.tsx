import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditResume from "../src/components/resume/[resumeId]/EditResume";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext"; // Import AuthProvider
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./pages/ErrorBoundary";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: (
          <ProtectedRoute>
            <EditResume />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
