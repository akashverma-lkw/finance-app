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
router.get("/me", verifyToken, getUserData);         
router.put("/update", verifyToken, updateUser);      
router.delete("/delete", verifyToken, deleteOwnUser); 


// Admin-Only Routes
router.get("/admin/users", verifyToken, isAdmin, getAllUsers);  
router.get("/admin/user/:id", verifyToken, isAdmin, getUserById);        
router.post("/admin/add-user", verifyToken, isAdmin, addUserByAdmin);   
router.delete("/admin/delete-user/:id", verifyToken, isAdmin, deleteUserByAdmin); 
router.put("/admin/update-user/:id", verifyToken, isAdmin, updateUserByAdmin); 
router.patch("/admin/toggle-role/:id", verifyToken, isAdmin, updateToggleRole); 

export default router;
