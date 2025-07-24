import { Complaint } from "../models/complaintModel.js";

export const createComplaint = async (req, res) => {
    try {
        const { title, type, description, room } = req.body;
        const user = req.user;

        const complaint = await Complaint.create({
            userId: user.id,
            email: user.email,
            hostel: user.hostel,
            room,
            title,
            type,
            description,
        });

        res.status(201).json({ message: "Complaint submitted!", complaint });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllComplaints = async (req, res) => {
    try {
        const hostel = req.user.hostel; // 👈 decode from JWT
        const complaints = await Complaint.find({ hostel }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getMyComplaints = async (req, res) => {
    try {
        const myComplaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(myComplaints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await Complaint.findByIdAndUpdate(id, { status }, { new: true });

        if (!updated) return res.status(404).json({ message: "Complaint not found" });

        res.json({ message: "Status updated", updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
