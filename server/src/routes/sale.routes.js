import express from "express";
import { Sale } from "../models/sales.model.js"
import { Router } from "express";

const salesRoutes = express.Router();
const router = Router();

salesRoutes.get("/getsales", async (req, res) => {
    try {
        const sales = await Sale.find(); // Fetch all sales records from the database
        res.status(200).json(sales);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).json({ message: "Failed to fetch sales data" });
    }
});

salesRoutes.post('/addnewsale', async (req,res) => {
    try {
        const { product, date, quantity, pricePerQuantity, total } = req.body;

        //validate required fields
        if(!product || !date || quantity<= 0 || pricePerQuantity <= 0) {
            return res.status(400).json({message: "Please provide valid sale details."});
        }

        //create a new sale record
        const newSale = new Sale({
            product,
            date,
            quantity,
            pricePerQuantity,
            total,
        });

        //Save to database
        const savedSale = await newSale.save();

        res.status(200).json(savedSale);
    } catch (error) {
        console.error("Error adding sale:", error);
        res.status(500).json({message: "Error adding sale", error});
    }
})


export { salesRoutes };


