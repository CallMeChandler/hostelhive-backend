import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  getAllUsers,
  deleteUserById,
  updateUserRole
} from "../controllers/userController.js";

const router = express.Router();

// Get own profile
router.get("/me", verifyToken, getMyProfile);

// Admin: get all users
router.get("/all", verifyToken, authorizeRoles("admin"), getAllUsers);

// Admin: delete user
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUserById);

router.put("/role/:id", verifyToken, authorizeRoles("admin"), updateUserRole);

export default router;
