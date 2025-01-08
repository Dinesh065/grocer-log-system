import mongoose from "mongoose"

const userDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true, // Ensures each user has a unique dataset
    },
    inventory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InventoryItem', // Reference to InventoryItem documents
        },
    ],
    sales: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sale', // Reference to Sale documents
        },
    ],
    customerCredits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer', // Reference to Customer documents
        },
    ],
}, { timestamps: true });

export const UserData = mongoose.model('UserData', userDataSchema);
