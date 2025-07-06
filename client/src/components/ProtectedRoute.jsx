import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Protects route access based on auth token and user role.
 * 
 * @param {ReactNode} children - Component to render if access is granted.
 * @param {Array<string>} allowedRoles - Roles allowed to access this route.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // 🚫 Redirect if not logged in
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 🔐 Redirect if role mismatch
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
