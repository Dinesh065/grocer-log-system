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
        min: 1, 
    },
    pricePerQuantity: {
        type: Number,
        required: true,
        min: 0,  
    },
    total: {
        type: Number,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },  
}, {
    timestamps: true,  
});

export const Sale =mongoose.model('Sale', salesSchema);
