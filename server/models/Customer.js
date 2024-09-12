//This model will represent customers who purchase goods on credit.

import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: 0
    },
    phone: {
        type: Number,
        required: true,
    },
    totalCredit: {
        type: Number,
        min: 0
    },
    transaction: [
        {
            sale: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Sale',
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            isPaid: {
                type: Boolean,
                default: false
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

//Update 'updatedAt' field
customerSchema.pre('save', function(next){
    this.updatedAt=Date.now();
    next();
});

module.exports = mongoose.model('Customer', customerSchema);