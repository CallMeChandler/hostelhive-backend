import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, hostel, room, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            hostel,
            room,
            role: role || "student"
        });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                hostel: user.hostel,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                hostel: user.hostel,
                room: user.room
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found." });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};