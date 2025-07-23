import { Circular } from "../models/circularModel.js";

export const createCircular = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const file = req.file;

        if (!title || !desc) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        const fileUrl = file ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}` : null;

        const newCircular = new Circular({
            title,
            message: desc,
            pdf: fileUrl,
            timestamp: new Date(),
        });

        await newCircular.save();

        res.status(201).json(newCircular);
    } catch (err) {
        console.error("❌ Error creating circular:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllCirculars = async (req, res) => {
    try {
        const circulars = await Circular.find().sort({ createdAt: -1 });
        res.json(circulars);
    } catch (err) {
        res.status(500).json({ message: "Error fetching circulars" });
    }
};