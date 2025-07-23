import mongoose from "mongoose";

const sportsRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  item: String,
  quantity: { type: Number, default: 1 },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
});

export const SportsRequest = mongoose.model("SportsRequest", sportsRequestSchema);
