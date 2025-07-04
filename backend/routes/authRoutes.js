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
import upload from "../middleware/upload.js";

const router = Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Public Routes
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", login);
router.post("/logout", logout);

// Authenticated User Routes
router.get("/me", verifyToken, getUserData);
router.put("/update", verifyToken, upload.single("profileImage"), updateUser);
router.delete("/delete", verifyToken, deleteOwnUser);

// Admin-Only Routes
router.get("/admin/users", verifyToken, isAdmin, getAllUsers);
router.get("/admin/user/:id", verifyToken, isAdmin, getUserById);
router.post("/admin/add-user", verifyToken, isAdmin, upload.single("profileImage"), addUserByAdmin); 
router.put("/admin/update-user/:id", verifyToken, isAdmin, upload.single("profileImage"), updateUserByAdmin);
router.delete("/admin/delete-user/:id", verifyToken, isAdmin, deleteUserByAdmin);
router.patch("/admin/toggle-role/:id", verifyToken, isAdmin, updateToggleRole);

export default router;
