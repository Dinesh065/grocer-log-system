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
        enum: ['In Stock', 'Low Stock', 'Out of Stock'],
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },  
}, {
    timestamps: true,  
});

inventoryItemSchema.pre("save", function (next) {
    if (this.qty === 0) {
        this.status = "Out of Stock";
    } else if (this.qty < 10) {
        this.status = "Low Stock";
    } else {
        this.status = "In Stock";
    }
    next();
});


export const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
