import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  BarChart2
} from "lucide-react";

const links = [
  { to: "/customer/overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
  { to: "/customer/transactions", label: "Transactions", icon: <CreditCard size={20} /> },
  { to: "/customer/budget", label: "Budget", icon: <Wallet size={20} /> },
  { to: "/customer/reports", label: "Reports", icon: <BarChart2 size={20} /> }
];

const CustomerSidebar = () => {
  return (
    <div className="w-16 md:w-64 bg-white shadow-lg h-auto p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6 hidden md:block text-blue-600">Customer Dashboard</h2>

      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                 hover:bg-blue-100 hover:text-blue-600
                 ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}
                `
              }
            >
              <span>{link.icon}</span>
              <span className="hidden md:inline">{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerSidebar;
