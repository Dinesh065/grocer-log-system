import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
    type: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'Unread' },
    created_at: { type: Date, default: Date.now }
  });
  
export const Alert = mongoose.model("Alert" ,AlertSchema)  