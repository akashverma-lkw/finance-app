import React, { useState } from "react";
import axios from "axios";
import { X, User, Mail, Phone, Lock } from "lucide-react";
import { FaChevronDown, FaUserTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoginModal from "./Login";

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[+\d]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, phone: value }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        formData,
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setFormData({ name: "", email: "", phone: "", userType: "", password: "" });
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  if (showLogin) {
    return <LoginModal isOpen={true} onClose={() => setShowLogin(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative animate-fade-in-up transition duration-300">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600">
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Create Your Account</h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <div className="relative flex items-center">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <span className="pl-10 pr-2 py-2 border border-r-0 rounded-l-md bg-gray-100 text-gray-600 text-sm">+91</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                // Allow only digits
                const digits = e.target.value.replace(/\D/g, "");
                if (digits.length <= 10) {
                  setFormData((prev) => ({ ...prev, phone: digits }));
                }
              }}
              placeholder="Contact"
              className="w-full border border-l-0 rounded-r-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div className="relative w-full">
            <FaUserTag
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="peer block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-10 pr-10 text-gray-700 text-sm leading-tight shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              <option value="">Select user type</option>
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
              <option value="business">Business</option>
            </select>
            <FaChevronDown
              size={14}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-blue-600"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
          >
            Register
          </button>

          {message && (
            <p className="text-center text-sm text-green-600 mt-2">{message}</p>
          )}
        </form>

        <p className="text-sm text-center mt-4 text-gray-700">
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
