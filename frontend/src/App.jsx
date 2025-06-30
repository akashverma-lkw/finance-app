import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// User Pages
import Home from "./pages/Home";
import RegisterModal from "./pages/RegisterModal";
import LoginModal from "./pages/Login";
import MyAccount from "./pages/MyAccount";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";

function App() {
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

        {/* ADMIN ROUTES */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
      <ScrollToTop />
    </Router>
    
  );
}

export default App;
