import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// User Pages
import Home from "./pages/Home";
import RegisterModal from "./pages/RegisterModal";
import LoginModal from "./pages/Login";
import MyAccount from "./pages/MyAccount";

import CustomerRoutes from "../src/routes/CustomerRoutes";
import CustomerDashboard from '../src/pages/customer/CustomerDashboard'
import Overview from '../src/pages/customer/Overview'
import Transactions from '../src/pages/customer/Transactions'
import Budget from '../src/pages/customer/Budget'
import Reports from '../src/pages/customer/Reports'



// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import UserTable from "./components/UserTable";

function AppRoutes() {
  const { loading } = useContext(AuthContext);
  if (loading) return null;
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/login" element={<LoginModal />} />

        <Route path="/account" element={<MyAccount />} />
        <Route path="/services" element={<div className="text-center mt-20">Services Page</div>} />
        <Route path="/about" element={<div className="text-center mt-20">About Us Page</div>} />
        <Route path="/help" element={<div className="text-center mt-20">Help Page</div>} />

        <Route path="/customer" element={<CustomerRoutes />}>
          <Route element={<CustomerDashboard />}>
            <Route index element={<Navigate to="overview" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budget" element={<Budget />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/users" element={<UserTable />} />

      </Routes>
      <ScrollToTop />
    </Router>

  );
}

function App() {
  return(
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;
