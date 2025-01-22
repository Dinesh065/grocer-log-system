import express from "express";
import { Sale } from "../models/sales.model.js"
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const salesRoutes = express.Router();
const router = Router();

salesRoutes.get("/getsales",verifyJWT, async (req, res) => {
    try {
        const sales = await Sale.find({userId: req.user.id});
        res.status(200).json(sales);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).json({ message: "Failed to fetch sales data" });
    }
});

salesRoutes.post('/addnewsale',verifyJWT, async (req,res) => {
    try {
        const { product, date, quantity, pricePerQuantity, total } = req.body;

        if(!product || !date || quantity<= 0 || pricePerQuantity <= 0) {
            return res.status(400).json({message: "Please provide valid sale details."});
        }

        const newSale = new Sale({
            userId: req.user.id,
            product,
            date,
            quantity,
            pricePerQuantity,
            total,
        });

        const savedSale = await newSale.save();

        res.status(200).json(savedSale);
    } catch (error) {
        console.error("Error adding sale:", error);
        res.status(500).json({message: "Error adding sale", error});
    }
})

export { salesRoutes };