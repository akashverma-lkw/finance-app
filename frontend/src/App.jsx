import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import HelpPage from "./components/HelpPage";

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
    <>
    <Helmet>
        <title>finSecure | Personal Finance Tracker</title>
        <meta
          name="description"
          content="Track your income, expenses, and savings easily with finSecure – a secure personal finance tracker web app."
        />
        <meta
          name="keywords"
          content="finance tracker, personal finance, budget app, expense manager, finSecure, React finance app"
        />
        <meta name="author" content="Akash Verma" />

        {/* Open Graph Tags for Social Media */}
        <meta property="og:title" content="finSecure | Personal Finance Tracker" />
        <meta
          property="og:description"
          content="Track your income, expenses, and savings with ease."
        />
        <meta property="og:url" content="https://finsecure-xi.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourdomain.com/preview.png"
        />

        {/* Schema Markup (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "finSecure",
              "url": "https://finsecure-xi.vercel.app",
              "applicationCategory": "FinanceApplication",
              "description": "A personal finance tracker to manage expenses and savings."
            }
          `}
        </script>
      </Helmet>
      
    <Router>
      <Navbar />
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/login" element={<LoginModal />} />

        <Route path="/account" element={<MyAccount />} />
        <Route path="/help" element={<HelpPage />} />

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
    </>
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
