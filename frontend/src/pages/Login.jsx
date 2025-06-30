import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        formData,
        { withCredentials: true }
      );

      const { token, user } = res.data;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userRole", user.userType);

      if (user.userType === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

      onClose(); // Close the modal
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl p-6 animate-fade-in-up transition duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
          >
            Login
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-center text-sm text-red-600 mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
