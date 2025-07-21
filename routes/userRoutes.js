import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  getAllUsers,
  deleteUserById
} from "../controllers/userController.js";

const router = express.Router();

// Get own profile
router.get("/me", verifyToken, getMyProfile);

// Admin: get all users
router.get("/", verifyToken, authorizeRoles("admin", "secretary"), getAllUsers);

// Admin: delete user
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUserById);

export default router;
