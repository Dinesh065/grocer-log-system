import express from "express";
import mongoose from 'mongoose';
import { InventoryItem } from "../models/inventory.models.js";
import { Router } from "express";
import { asyncHandler } from "../utils/asynchandler.js";

const inventoryRoutes = express.Router();
const router = Router();

inventoryRoutes.get('/items', async (req, res) => {
    try {
        const items = await InventoryItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});

inventoryRoutes.post('/addnewitem', async (req, res) => {
    try {
        const newItem = new InventoryItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(501).json({ message: 'Error adding new item', error });
    }
});

inventoryRoutes.put('/update/:sku', async (req, res) => {
    const { sku } = req.params;
    const updates = req.body;

    try {
        const updatedItem = await InventoryItem.findOneAndUpdate(
            { sku }, // Match by SKU
            updates,
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item with the given SKU not found.' });
        }

        res.status(200).json({ data: updatedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the item', error });
    }
});

inventoryRoutes.delete('/deletebysku/:sku', asyncHandler(async (req, res) => {
    const { sku } = req.params;
    const deletedItem = await InventoryItem.findOneAndDelete({ sku });

    if (!deletedItem) {
        return res.status(404).json({ message: "Item with the given SKU not found." });
    }

    res.status(200).json({ message: "Item deleted successfully." });
}));




export { inventoryRoutes };


