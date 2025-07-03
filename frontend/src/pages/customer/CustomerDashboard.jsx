import React from "react";
import CustomerSidebar from "../../components/customer/CustomerSidebar";
import { Outlet } from "react-router-dom";

const CustomerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <CustomerSidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerDashboard;
