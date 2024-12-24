import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    qty: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        enum: ['In stock', 'Low', 'Out of stock'],
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

export const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
