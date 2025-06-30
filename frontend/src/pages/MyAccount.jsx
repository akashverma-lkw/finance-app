import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaUserTie, FaEdit } from "react-icons/fa";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: ""
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        setUser(res.data.user);
        setFormData(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    if (token) fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("Profile updated successfully");
      setUser(res.data.user);
      setEditing(false);
    } catch (err) {
      console.error("Update error", err);
      setMessage("Failed to update profile");
    }
  };

  if (!user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-16 rounded-lg ">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <FaUser className="text-blue-600" /> My Account
      </h2>

      {!editing ? (
        <>
          <div className="space-y-4 text-gray-700 text-md">
            <div className="flex items-center gap-3">
              <FaUser className="text-blue-600" />
              <span><strong>Name:</strong> {user.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <span><strong>Email:</strong> {user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-600" />
              <span><strong>Phone:</strong> {user.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaUserTie className="text-blue-600" />
              <span><strong>User Type:</strong> {user.userType}</span>
            </div>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaEdit /> Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4 mt-4 text-sm text-gray-800">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Phone number"
              required
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <FiCheckCircle /> Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setFormData(user);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              <FiXCircle /> Cancel
            </button>
          </div>
        </form>
      )}

      {message && (
        <p className="mt-4 text-sm text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default MyAccount;
