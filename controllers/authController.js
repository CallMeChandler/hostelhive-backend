import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, hostel, room, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, email, hostel, room, role, password: hashed
        }); 

        res.status(201).json({ message: "Registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};