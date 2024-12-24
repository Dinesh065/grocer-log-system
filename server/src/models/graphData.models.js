import mongoose from "mongoose";

const GraphDataSchema = new mongoose.Schema({
    dashboard_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DashboardItem', required: true },
    date: { type: Date, required: true },
    value: { type: Number, required: true }
  });
  

export const GraphData =  mongoose.model('GraphData', GraphDataSchema);
  