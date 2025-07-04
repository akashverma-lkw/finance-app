import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // <-- Adjust the path if needed
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaEdit
} from "react-icons/fa";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const MyAccount = () => {
  const { profileImage, setProfileImage } = useContext(AuthContext); // 🔄 Global image state
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
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
        setPreviewImage(res.data.user.profileImage?.url);

        // Update context and localStorage
        localStorage.setItem("userImage", res.data.user.profileImage?.url);
        setProfileImage(res.data.user.profileImage?.url);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    if (token) fetchUser();
  }, [token, setProfileImage]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      if (selectedImage) form.append("profileImage", selectedImage);

      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/update`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      const updatedImageUrl = res.data.user.profileImage?.url;

      // 🔄 Update local + global image immediately
      localStorage.setItem("userImage", updatedImageUrl);
      setProfileImage(updatedImageUrl);

      setMessage("Profile updated successfully!");
      setUser(res.data.user);
      setEditing(false);
      setSelectedImage(null);
      setPreviewImage(updatedImageUrl);
    } catch (err) {
      console.error("Update error", err);
      setMessage("Failed to update profile.");
    }
  };

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center text-blue-600 text-lg sm:text-xl">
        Loading...
      </div>
    );

  return (
    <div className="pt-[80px] min-h-[calc(100vh-80px)] w-full bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-start px-3 sm:px-5">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-5 sm:p-8 md:p-10 my-10 transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-6 flex items-center gap-2 sm:gap-3">
          <FaUser className="text-purple-500 animate-bounce text-xl sm:text-2xl" /> My Account
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={previewImage || "https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md"
          />
        </div>

        {!editing ? (
          <>
            <div className="space-y-4 sm:space-y-5 text-gray-800 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <FaUser className="text-indigo-500" />
                <span><strong>Name:</strong> {user.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-pink-500" />
                <span><strong>Email:</strong> {user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-green-500" />
                <span><strong>Phone:</strong> {user.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaUserTie className="text-yellow-500" />
                <span><strong>User Type:</strong> {user.userType}</span>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-6 px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition flex items-center gap-2 text-sm sm:text-base"
            >
              <FaEdit /> Edit Profile
            </button>
          </>
        ) : (
          <form
            onSubmit={handleUpdate}
            className="space-y-4 sm:space-y-5 mt-4 animate-fade-in transition duration-300 text-sm sm:text-base"
            encType="multipart/form-data"
          >
            <span className="block text-lg font-semibold mb-2 text-center">Update Details</span>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Phone number"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg p-2 bg-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition"
              >
                <FiCheckCircle /> Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setFormData(user);
                  setPreviewImage(user.profileImage?.url);
                  setSelectedImage(null);
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full transition"
              >
                <FiXCircle /> Cancel
              </button>
            </div>
          </form>
        )}

        {message && (
          <div className="mt-5 text-center text-sm text-blue-600 font-medium animate-pulse">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
