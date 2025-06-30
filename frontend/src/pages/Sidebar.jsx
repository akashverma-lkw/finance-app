// src/components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <Home size={20} />,
      onClick: () => navigate("/admin-dashboard"),
    },
    {
      label: "Manage Users",
      icon: <Users size={20} />,
      onClick: () => navigate("/admin-dashboard"),
    }
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="text-white bg-blue-700 p-2 rounded-md"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          open ? "block" : "hidden md:block"
        } fixed md:static z-40 w-64 min-h-screen bg-blue-900 text-white p-6 transition-all duration-300`}
      >
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
        <nav className="flex flex-col gap-6">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-3 hover:text-blue-300"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-300 hover:text-red-500 mt-10"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
