import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuthContext } from "../hooks/useAuthContext";

const PublicRoutes: React.FC = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
