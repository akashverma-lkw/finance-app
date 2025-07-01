// src/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, LogOut } from "lucide-react";

const Sidebar = () => {
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
    },
  ];

  return (
    <div className="hidden md:fixed md:z-40 md:w-64 md:min-h-screen md:flex md:flex-col md:items-start bg-blue-900 text-white p-6 transition-all duration-300">
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
      <nav className="flex flex-col gap-6 mt-10 w-full">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex items-center gap-3 hover:text-blue-300"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-300 hover:text-red-500 mt-10"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
