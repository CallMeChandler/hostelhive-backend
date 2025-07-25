import { SportItem } from "../models/sportsItemModel.js";
import { SportsRequest } from "../models/sportsReqModel.js";


export const getAllItems = async (req, res) => {
    try {
        const hostel = req.user.hostel;

        
        let items = await SportItem.find({ hostel });

        
        if (items.length === 0) {
            items = await SportItem.find({ hostel: { $exists: false } });
        }

        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const createRequest = async (req, res) => {
    try {
        const { item } = req.body;
        const user = req.user;

        const request = new SportsRequest({
            userId: user.id,
            name: user.name,
            email: user.email,
            item,
            quantity: 1,
            hostel: user.hostel,
        });


        await request.save();
        res.status(201).json({ message: "Request Submitted", request });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getAllRequests = async (req, res) => {
    try {
        const hostel = req.user.hostel;
        const requests = await SportsRequest.find({ hostel }).sort({ date: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const request = await SportsRequest.findById(id);
        if (!request) return res.status(404).json({ message: "Request not found" });

        request.status = status;
        await request.save();

        if (status === "approved") {
            await SportItem.findOneAndUpdate(
                { item: request.item, hostel: request.hostel },
                { $inc: { qty: -1 } }
            );
        }

        res.json({ message: "Status updated", request });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
