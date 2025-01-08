import express from "express";
import { getDashboardData } from "../controllers/user.controller.js";
import { InventoryItem } from "../models/inventory.models.js";
import { Customer } from "../models/Customer.model.js";
import { Sale } from "../models/sales.model.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/dashboard", async(req,res) => {
    try {
        const totalItems = await InventoryItem.countDocuments();
        const totalCredits = await Customer.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPending" } } }
        ]);
        const totalSales = await Sale.aggregate([
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);

        const inventoryEntries = await InventoryItem.find().limit(3);
        const creditEntries = await Customer.find().limit(3);
        const salesEntries = await Sale.find().limit(3);

        res.json({
            totalItems,
            totalCredits: totalCredits[0]?.total || 0,
            totalSales: totalSales[0]?.total || 0,
            inventoryEntries,
            creditEntries,
            salesEntries
        });
    } catch (error) {
        console.error("Error in dashboard data:", error);  // Log the error
        res.status(500).json({ message: error.message });
    }
});

export { dashboardRoutes };