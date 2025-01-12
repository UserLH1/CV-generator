import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();
  console.log("token from protected: ", token);

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
