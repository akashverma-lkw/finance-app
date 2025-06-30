import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  getUserData,
  updateUser,
  deleteOwnUser,
  getAllUsers,
  getUserById,
  addUserByAdmin,
  updateUserByAdmin,
  updateToggleRole,
  deleteUserByAdmin
} from "../controllers/authController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};


// Public Routes
router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);


// Authenticated User Routes
router.get("/me", verifyToken, getUserData);         // Get logged-in user data
router.put("/update", verifyToken, updateUser);      // Update own profile
router.delete("/delete", verifyToken, deleteOwnUser); // Delete own account


// Admin-Only Routes
router.get("/admin/users", verifyToken, isAdmin, getAllUsers);  
router.get("/admin/user/:id", verifyToken, isAdmin, getUserById);        // View all users
router.post("/admin/add-user", verifyToken, isAdmin, addUserByAdmin);   // Add user
router.delete("/admin/delete-user/:id", verifyToken, isAdmin, deleteUserByAdmin); // Delete user by ID
router.put("/admin/update-user/:id", verifyToken, isAdmin, updateUserByAdmin); // Update user
router.patch("/admin/toggle-role/:id", verifyToken, isAdmin, updateToggleRole); // Toggle user role

export default router;
