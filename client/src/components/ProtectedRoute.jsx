// client/src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * 🔒 ProtectedRoute Component
 * Restricts access based on token and role.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component to render
 * @param {Array<string>} props.allowedRoles - Array of roles allowed to access
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // 🚫 Not authenticated
  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // 🚫 Role not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
