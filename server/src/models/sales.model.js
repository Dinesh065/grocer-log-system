import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure quantity is at least 1
    },
    pricePerQuantity: {
        type: Number,
        required: true,
        min: 0, // Ensure price is non-negative
    },
    total: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

export const Sale =mongoose.model('Sale', salesSchema);
