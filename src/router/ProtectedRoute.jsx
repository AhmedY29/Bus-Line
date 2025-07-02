import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/" }) => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return <Navigate to={redirectTo} replace />;
  }

  let user;
  try {
    user = JSON.parse(userString);
  } catch {
    return <Navigate to={redirectTo} replace />;
  }
  const userRole = user?.role;
  if (!userRole) {
    return <Navigate to={redirectTo} replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
