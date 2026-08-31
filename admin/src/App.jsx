import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

/**
 * Route map for the admin frontend.
 *
 *   /                  -> /admin/login
 *   /admin             -> /admin/login
 *   /admin/login       -> AdminLogin (bounces to dashboard if already signed in)
 *   /admin/dashboard   -> AdminDashboard, behind ProtectedRoute
 *   anything else      -> /admin/login
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
