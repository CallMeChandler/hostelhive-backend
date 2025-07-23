import mongoose, { Mongoose } from "mongoose";

// circularModel.js
const circularSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    pdf: { type: String }, 
    timestamp: { type: Date, default: Date.now }
});


export const Circular = mongoose.model("Circular", circularSchema);