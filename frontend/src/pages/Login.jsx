import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
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
        `${import.meta.env.VITE_BACKEND_URL}/login`,
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
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Login
          </button>

          {error && (
            <p className="text-center text-red-600 text-sm">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
