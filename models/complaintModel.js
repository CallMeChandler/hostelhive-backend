import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Electrical", "Plumbing", "Furniture", "Hygiene", "Mess", "Sports", "Other"],
    default: "Other",
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved", "Rejected"],
    default: "Pending",
  },
  hostel: String,
  room: String,
}, { timestamps: true });

export const Complaint = mongoose.model("Complaint", complaintSchema);
