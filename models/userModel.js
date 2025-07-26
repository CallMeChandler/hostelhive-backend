import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hostel: {
    type: String,
  },
  room: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "admin", "sports-secretary", "mess-secretary", "maintenance-secretary"],
    default: "student",
  },
  password: {
    type: String,
    required: true,
  },
  branch: { type: String },
  profileImage: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;

