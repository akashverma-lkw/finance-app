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
    }
  ];

  return (
    <div className="fixed md:static z-40 w-16 md:w-64 min-h-screen bg-blue-900 text-white p-4 md:p-6 transition-all duration-300 flex flex-col items-center md:items-start">
      {/* Logo / Title */}
      <h1 className="hidden md:block text-2xl font-bold mb-10">Admin Panel</h1>

      {/* Main navigation (fill space vertically) */}
      <nav className="flex flex-col flex-grow gap-6 w-full items-center md:items-start">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex flex-col md:flex-row items-center gap-1 md:gap-3 hover:text-blue-300"
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </button>
        ))}

        {/* Spacer pushes logout to the bottom */}
        <div className="flex-grow" />

        {/* Logout at bottom */}
        <button
          onClick={handleLogout}
          className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-red-300 hover:text-red-500"
        >
          <LogOut size={20} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
