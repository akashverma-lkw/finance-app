import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./Login"; // ✅ Ensure path is correct

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false); // ✅ Track login modal
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`,
        formData,
        { withCredentials: true }
      );
      console.log("✅ Response:", res.data);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", phone: "", userType: "", password: "" });
      setTimeout(() => {
        navigate("/");
      window.location.reload();
      }, 2000)
      
    } catch (err) {
      console.error("❌ Error:", err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  // 🔁 If showLogin is true, render LoginModal and not RegisterModal
  if (showLogin) {
    return <LoginModal isOpen={true} onClose={() => setShowLogin(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-800">
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">User Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select User Type</option>
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
            <option value="business">Business</option>
          </select>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Register
          </button>

          {message && (
            <p className="text-center text-sm text-green-600 mt-2">{message}</p>
          )}
        </form>

        {/* Switch to Login */}
        <p className="text-lg text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => setShowLogin(true)}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
