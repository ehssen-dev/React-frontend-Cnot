import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleBasedRoute = ({ element: Component, allowedRoles }) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.some((role) => hasRole(role))) {
    return <Navigate to="/not-authorized" />;
  }

  return Component;
};

export default RoleBasedRoute;
