import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoutes: React.FC = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
