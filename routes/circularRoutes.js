import express from "express";
import multer from "multer";
import path from "path";
import { createCircular, getAllCirculars } from "../controllers/circularController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.post(
    "/",
    verifyToken,
    authorizeRoles("admin", "mess-secretary", "maintenance-secretary", "sports-secretary"),
    upload.single("file"), // ✅ multer middleware
    createCircular
);

router.get("/", verifyToken, getAllCirculars);


export default router;