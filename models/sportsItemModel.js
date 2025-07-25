import mongoose from "mongoose";

const sportItemSchema = new mongoose.Schema({
  item: { type: String, required: true, unique: true },
  hostel: String,
  qty: { type: Number, default: 0 }
});

export const SportItem = mongoose.model("SportItem", sportItemSchema);
