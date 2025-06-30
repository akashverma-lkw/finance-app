import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import Sidebar from "./Sidebar";
import { FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentSection, setCurrentSection] = useState("welcome"); // welcome | users
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");

  useEffect(() => {
  if (!token || role !== "admin") {
    navigate("/login");
  } else {
    fetchUsers();
  }
}, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleManageUsersClick = () => {
    setCurrentSection("users");
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/delete-user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar onNavigate={setCurrentSection} /> {/* Pass section handler if needed */}
      <main className="flex-1 md:ml-8 p-6">
        {currentSection === "welcome" && (
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Welcome Admin 👋</h1>
            <p className="text-gray-600 mt-2">
              Manage users, policies, and system insights right from your dashboard.
            </p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <FaUsers size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-xl font-bold">{users.length || "0"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleManageUsersClick}
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow"
            >
              Manage Users
            </button>
          </div>
        )}

        {currentSection === "users" && (
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
              <button
                onClick={() => setCurrentSection("welcome")}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Back to Dashboard
              </button>
            </div>
            <UserTable users={users} onDelete={handleDelete} />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
