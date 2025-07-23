import { SportItem } from "../models/sportsItemModel.js";
import { SportsRequest } from "../models/sportsReqModel.js";

export const getAllItems = async (req, res) => {
    const items = await SportItem.find();
    res.json(items);
};

export const createRequest = async (req, res) => {
    const { item } = req.body;
    const user = req.user;

    const request = new SportsRequest({
        userId: user.id,
        name: user.name,
        email: user.email,
        item,
        quantity: 1,
    });

    await request.save();
    res.status(201).json({ message: "Request Submitted", request });
};

export const getAllRequests = async (req, res) => {
    const requests = await SportsRequest.find().sort({ date: -1 });
    res.json(requests);
};

export const updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const request = await SportsRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await request.save();

    
    if (status === "approved") {
        await SportItem.findOneAndUpdate(
            { item: request.item },
            { $inc: { qty: 1 } }
        );
    }

    res.json({ message: "Status updated", request });
};