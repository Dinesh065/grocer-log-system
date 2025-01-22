import express from "express";
import { Customer } from "../models/Customer.model.js";
import nodemailer from "nodemailer";
import env from "dotenv";
import { verifyJWT } from "../middlewares/auth.middleware.js";
env.config();

const customerRoutes = express.Router()

customerRoutes.get('/',verifyJWT, async (req, res) => {
    try {
        const customers = await Customer.find({ userId: req.user._id });

        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Error fetching customers' });
    }
});

customerRoutes.post('/addnewcustomer', verifyJWT, async (req, res) => {
    try {
        const { name, flatNo, societyName, email, totalPending, purchases, startDate, lastPurchase, status } = req.body;

        if (!name || !societyName || !email || totalPending < 0) {
            return res.status(400).json({ message: "Please provide valid customer details." });
        }

        const newCustomer = new Customer({
            userId: req.user._id, 
            name,
            flatNo,
            societyName,
            email,
            totalPending: totalPending || 0,
            startDate: startDate || new Date(),
            lastPurchase: lastPurchase || new Date(),
            purchases: purchases || [],
            status: status || 'Pending',
        });

        const savedCustomer = await newCustomer.save();

        res.status(201).json(savedCustomer); 
    } catch (error) {
        console.error("Database save error:", error);
        res.status(500).json({ message: "Database save failed", error: error.message });
    }
});

customerRoutes.put('/:customerId/updatepurchase',verifyJWT, async (req, res) => {
    const customerId = req.params.customerId;
    const { purchases, totalPending, lastPurchase } = req.body;

    try {
        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Update the customer fields
        customer.purchases = purchases;
        customer.totalPending = totalPending;
        customer.lastPurchase = lastPurchase;

        // Save the updated customer record
        const updatedCustomer = await customer.save();

        return res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        return res.status(500).json({ message: 'Error updating customer' });
    }
});

//Delete Item function
customerRoutes.put('/:customerId/updatePurchases',verifyJWT, async (req, res) => {
    const { customerId } = req.params;
    const { purchases, totalPending } = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { purchases, totalPending },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer purchases:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


customerRoutes.put('/:customerId/markAsPaid',verifyJWT, async (req,res) => {
    const { customerId } = req.params;
    const { status, totalPending, paidOn } = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { status, totalPending, paidOn },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error while updating customer status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

customerRoutes.delete('/:customerId/deleteCustomer',verifyJWT, async (req, res) => {
    const { customerId } = req.params;  

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(customerId);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


customerRoutes.post('/send-bill-email', async (req, res) => {
    const { email, billHtml } = req.body;

    if (!email || !billHtml) {
        return res.status(400).json({ message: 'Missing email or bill data.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS,  
            },
        });

        await transporter.verify();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Bill from [Your Business Name]',
            html: billHtml, // HTML content of the bill
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Bill sent successfully.' });
    }catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            message: 'Failed to send email.',
            error: error.message || 'Unknown error',
        });
    }
});

export { customerRoutes };