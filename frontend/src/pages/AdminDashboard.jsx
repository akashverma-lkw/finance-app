import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import Sidebar from "./Sidebar";
import { FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentSection, setCurrentSection] = useState("welcome");
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
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
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

  const handleView = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`User Details:\n\nName: ${res.data.name}\nEmail: ${res.data.email}`);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  const handleEdit = async (user) => {
    const newName = prompt("Enter new name:", user.name);
    if (!newName || newName === user.name) return;

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/update-user/${user._id}`, {
        name: newName,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleToggleRole = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/toggle-role/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Failed to toggle role:", err);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-user/${id}`,
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - fixed width */}
      <Sidebar onNavigate={setCurrentSection} />

      {/* Main content */}
      <main className="flex-1 ml-16 md:ml-16 p-4 md:p-6 transition-all duration-300">
        {currentSection === "welcome" && (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
              Welcome Admin 👋
            </h1>
            <p className="text-gray-600 text-sm md:text-base mt-1 md:mt-2">
              Manage users, policies, and system insights right from your dashboard.
            </p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow flex items-center space-x-3">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full text-blue-600">
                  <FaUsers size={20} />
                </div>
                <div>
                  <p className="text-gray-600 text-xs md:text-sm">Total Users</p>
                  <p className="text-lg md:text-xl font-bold">{users.length || "0"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleManageUsersClick}
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-sm md:text-base rounded-lg shadow"
            >
              Manage Users
            </button>
          </div>
        )}

        {currentSection === "users" && (
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
                User Management
              </h2>
              <button
                onClick={() => setCurrentSection("welcome")}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Back to Dashboard
              </button>
            </div>
            <UserTable 
              users={users}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggleRole={handleToggleRole}
              onView={handleView}
               />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
