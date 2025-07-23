import express from "express";
import { getMenu, saveMenu, updateMessMenu } from "../controllers/messMenuController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMenu);
router.put("/", verifyToken, authorizeRoles("admin", "secretary"), saveMenu);
router.put("/edit", verifyToken, authorizeRoles("admin", "secretary"), updateMessMenu);


export default router;
