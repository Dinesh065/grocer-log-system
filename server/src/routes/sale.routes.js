import express from "express";
import { Sale } from "../models/sales.model.js"
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import zod, { date } from "zod"

const salesRoutes = express.Router();
const router = Router();

const addnewsaleSchema = zod.object({
    product:zod.string(),
    date: zod.preprocess((val) => new Date(val), zod.date()),
    quantity:zod.number(),
    pricePerQuantity:zod.number(),
    total:zod.number()
})

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
        const response = addnewsaleSchema.safeParse(req.body);
        if(!response.success){
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