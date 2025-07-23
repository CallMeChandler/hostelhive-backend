import express from "express";
import {
  getAllItems,
  createRequest,
  getAllRequests,
  updateRequestStatus
} from "../controllers/sportsController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stock", verifyToken, getAllItems);
router.post("/request", verifyToken, createRequest);
router.get("/requests", verifyToken, authorizeRoles("admin", "secretary"), getAllRequests);
router.put("/request/:id", verifyToken, authorizeRoles("admin", "secretary"), updateRequestStatus);

export default router;
