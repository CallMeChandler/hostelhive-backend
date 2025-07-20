import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin-only", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: `Welcome Admin ${req.user.name}` });
});

router.get("/student-only", verifyToken, authorizeRoles("student"), (req, res) => {
    res.json({ message: `Hello Student ${req.user.name}` });
});

router.get("/any-logged-in", verifyToken, (req, res) => {
    res.json({ message: `Hey ${req.user.name}, you're authenticated!` });
});

router.get("/test", verifyToken, (req, res) => {
    res.status(200).json({ message: "Protected route accessed!" });
});

export default router;