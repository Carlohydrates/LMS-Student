import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoutes: React.FC = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
