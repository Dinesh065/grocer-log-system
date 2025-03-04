import express from "express";
import { InventoryItem } from "../models/inventory.models.js";
import { Customer } from "../models/customer.model.js";
import { Sale } from "../models/sales.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import mongoose from "mongoose";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/dashboard", verifyJWT, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const totalItems = await InventoryItem.countDocuments({ userId });

        const totalCreditsResult = await Customer.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: "$totalPending" } } }
        ]);
        const totalCredits = totalCreditsResult.length > 0 ? totalCreditsResult[0].total : 0;

        const totalSalesResult = await Sale.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);
        const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].total : 0;

        const inventoryEntries = await InventoryItem.find({ userId }).limit(3);
        const creditEntries = await Customer.find({ userId }).limit(3);
        const salesEntries = await Sale.find({ userId }).limit(3);

        res.json({
            totalItems,
            totalCredits,
            totalSales,
            inventoryEntries,
            creditEntries,
            salesEntries
        });
    } catch (error) {
        console.error("Error in dashboard data:", error); 
        res.status(500).json({ message: error.message });
    }
});

export { dashboardRoutes };