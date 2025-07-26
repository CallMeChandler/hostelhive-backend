import express from "express";
import { getMenu, saveMenu, updateMessMenu } from "../controllers/messMenuController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getMenu);
router.put("/", verifyToken, authorizeRoles("admin", "mess-secretary"), saveMenu);
router.put("/edit", verifyToken, authorizeRoles("admin", "mess-secretary"), updateMessMenu);


export default router;
