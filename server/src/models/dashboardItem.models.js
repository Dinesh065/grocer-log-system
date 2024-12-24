import mongoose from "mongoose";

const DashboardItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    icon: { type: String },
    updated_at: { type: Date, default: Date.now }
  });
  
export const DashboardItem = mongoose.model("DashboardItem", DashboardItemSchema)  