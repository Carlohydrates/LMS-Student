import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Spinner } from "flowbite-react";

const ProtectedRoutes: React.FC = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Spinner size={"xl"}></Spinner>
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
