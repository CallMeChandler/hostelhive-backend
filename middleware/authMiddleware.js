import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/userModel.js";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🧠 Fetch full user from DB to attach hostel (and other info if needed)
    const fullUser = await User.findById(decoded.id);

    if (!fullUser) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = {
      id: fullUser._id,
      email: fullUser.email,
      role: fullUser.role,
      hostel: fullUser.hostel, // ✅ Now available in all controllers!
    };

    next();
  } catch (err) {
    console.error("JWT decode error:", err);
    return res.status(401).json({ message: "Invalid Token." });
  }
};


export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
