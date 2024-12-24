import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the purchased item
    quantity: { type: Number, required: true, min: 1 }, // Quantity purchased
    pricePerItem: { type: Number, required: true, min: 0 }, // Price per item
    total: { type: Number, required: true, min: 0 }, // Total cost (quantity * pricePerItem)
    date: { type: Date, required: true, default: Date.now }, // Purchase date
});

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Customer's name
    flatNo: { type: String }, // Flat number (optional)
    societyName: { type: String, required: true }, // Society name
    email: { type: String, required: true, unique: true }, // Email (unique identifier)
    totalPending: { type: Number, required: true, default: 0 }, // Total pending amount
    startDate: { type: Date, default: Date.now }, // Account creation date
    lastPurchase: { type: Date }, // Date of the last purchase
    purchases: [purchaseSchema], // Array of purchases
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }, // Payment status
    paidOn: { type: Date }, // Date when the payment was made
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

export const Customer = mongoose.model("Customer", customerSchema)