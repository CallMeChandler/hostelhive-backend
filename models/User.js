import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hostel: { type: String },
    room: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin", "mess", "maintenance", "sports"], default: "student" }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;