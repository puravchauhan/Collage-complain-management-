import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* Login page opens at http://localhost:5173/ */}
      <Route path="/" element={<AdminLogin />} />

      {/* Dashboard opens after successful login */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect old URLs */}
      <Route path="/admin" element={<Navigate to="/" replace />} />
      <Route path="/admin/login" element={<Navigate to="/" replace />} />
      <Route
        path="/admin/dashboard"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* Unknown routes return to the login page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}