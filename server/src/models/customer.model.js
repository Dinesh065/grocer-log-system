import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    quantity: { type: Number, required: true, min: 1 },  
    pricePerItem: { type: Number, required: true, min: 0 },  
    total: { type: Number, required: true, min: 0 }, 
    date: { type: Date, required: true, default: Date.now }, 
});

const customerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },  
    name: { type: String, required: true }, 
    flatNo: { type: String }, 
    societyName: { type: String, required: true },  
    email: { type: String, required: true, unique: true },  
    totalPending: { type: Number, required: true, default: 0 },  
    startDate: { type: Date, default: Date.now }, 
    lastPurchase: { type: Date },  
    purchases: [purchaseSchema], 
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },  
    paidOn: { type: Date }, 
}, { timestamps: true }); 

export const Customer = mongoose.model("Customer", customerSchema)