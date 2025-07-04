import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cloudinary } from "../config/cloudinary.js";
import streamifier from "streamifier";
import axios from "axios"; 

// Helper: Upload image from URL to Cloudinary
const uploadFromUrl = async (imageUrl) => {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data, "utf-8");

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "user_profiles" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};


// Register Any User (customer, employee, business, admin)
export const registerUser = async (req, res) => {
  try {
    let profileImage = {
      url: "https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png", // Replace with your own default image URL
      public_id: "",
    };

    // Case 1: File uploaded via multer
    if (req.file) {
      profileImage = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    // Case 2: Image URL provided in body
    else if (req.body.profileImage && req.body.profileImage.startsWith("http")) {
      const uploaded = await uploadFromUrl(req.body.profileImage);
      profileImage = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    }

    const user = new User({
      ...req.body,
      profileImage,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
};

// Login for User or Admin
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: user.userType === "admin" ? "1h" : "7d" }
    );

    res.status(200).json({
      message: `${user.userType === "admin" ? "Admin" : "User"} login successful`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Logout (handled on frontend)
export const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful. Please remove token from client." });
};

// Get User Profile
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
};

// Update Profile
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // If image is being updated
    if (req.file) {
      // Delete old image if exists
      if (user.profileImage?.public_id) {
        await cloudinary.uploader.destroy(user.profileImage.public_id);
      }

      // Set new image data
      req.body.profileImage = {
        url: req.file.path,
        public_id: req.file.filename, // from CloudinaryStorage
      };
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true }).select("-password");

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};

// Delete Own Profile
export const deleteOwnUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// Admin: Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
};

// Admin: Add New User
export const addUserByAdmin = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User added by admin", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to add user", error: err.message });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updateData = { ...req.body };

    if (req.file) {
      // 🔁 Delete old image if exists
      if (user.profileImage?.public_id) {
        await cloudinary.uploader.destroy(user.profileImage.public_id);
      }

      // 📥 Add new Cloudinary image
      updateData.profileImage = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");

    res.status(200).json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
};


export const updateToggleRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.userType = user.userType === "admin" ? "customer" : "admin";
    await user.save();

    res.status(200).json({ message: "User role updated", newRole: user.userType });
  } catch (err) {
    console.error("Toggle role error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin: Delete User by ID
export const deleteUserByAdmin = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};
