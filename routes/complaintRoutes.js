import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createComplaint);
router.get("/my", verifyToken, getMyComplaints);
router.get("/all", verifyToken, authorizeRoles("admin", "secretary"), getAllComplaints);
router.put("/:id/status", verifyToken, authorizeRoles("admin", "secretary"), updateComplaintStatus);

export default router;
