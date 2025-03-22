import express from "express";
import { InventoryItem } from "../models/inventory.models.js";
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import zod from "zod";

const inventoryRoutes = express.Router();
const router = Router();
 
const additemSchema = zod.object({
    name:zod.string(),
    qty:zod.number()
})

const generateSku = (name) => {
    const timestamp = Date.now().toString(36); // Base36 timestamp
    const uniqueSuffix = Math.random().toString(36).substring(2, 7).toUpperCase(); // Random unique string
    return `SKU-${name.slice(0, 3).toUpperCase()}-${timestamp}-${uniqueSuffix}`; // Format: SKU-<name>-<timestamp>-<random>
};

inventoryRoutes.get('/items',verifyJWT, async (req, res) => {
    try {
        const items = await InventoryItem.find({ userId: req.user.id });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});

inventoryRoutes.post('/addnewitem', verifyJWT, async (req, res) => {
    try {

        const { name, qty } = req.body;
        const response = additemSchema.safeParse(req.body);
        if(!response.success){
            return res.status(400).json({ message: "Name and Quantityare required." });
        }

        const sku = generateSku(name);  

        const status = qty === 0 ? "Out of Stock" : qty < 10 ? "Low Stock" : "In Stock";

        const newItem = new InventoryItem({
            name,
            qty,
            status,
            sku,  
            userId: req.user.id,
            dateAdded: new Date(),
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error adding new item:", error.message);
        res.status(500).json({ message: "Error adding new item", error: error.message });
    }
});

inventoryRoutes.put('/update/:sku',verifyJWT, async (req, res) => {
    const { sku } = req.params;
    const updates = req.body;

    try {
        if (updates.qty !== undefined) {
            updates.status = updates.qty === 0 ? "Out of Stock" : updates.qty < 10 ? "Low" : "In Stock";
        }

        const updatedItem = await InventoryItem.findOneAndUpdate(
            { sku,userId: req.user.id },
            updates,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item with the given SKU not found.' });
        }

        res.status(200).json({ data: updatedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the item', error });
    }
});

inventoryRoutes.delete('/deletebysku/:sku',verifyJWT, asyncHandler(async (req, res) => {
    const { sku } = req.params;
    const deletedItem = await InventoryItem.findOneAndDelete({ sku, userId: req.user.id });

    if (!deletedItem) {
        return res.status(404).json({ message: "Item with the given SKU not found." });
    }

    res.status(200).json({ message: "Item deleted successfully." });
}));

export { inventoryRoutes };