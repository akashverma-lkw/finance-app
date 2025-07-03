import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CustomerRoutes = () => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!isLoggedIn || user?.role !== "customer") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default CustomerRoutes;
