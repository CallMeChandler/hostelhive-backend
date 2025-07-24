import mongoose from "mongoose";

const dayMealSchema = new mongoose.Schema({
  breakfast: { type: String, default: "" },
  lunch: { type: String, default: "" },
  snacks: {type: String, default: ""},
  dinner: { type: String, default: "" }
});

const messMenuSchema = new mongoose.Schema({
  hostel: { type: String, required: true },
  week: {
    monday: dayMealSchema,
    tuesday: dayMealSchema,
    wednesday: dayMealSchema,
    thursday: dayMealSchema,
    friday: dayMealSchema,
    saturday: dayMealSchema,
    sunday: dayMealSchema
  },
  updatedAt: { type: Date, default: Date.now }
});

export const MessMenu = mongoose.model("MessMenu", messMenuSchema);
