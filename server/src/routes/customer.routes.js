import express from "express";
import { Customer } from "../models/Customer.model.js";

const customerRoutes = express.Router()

customerRoutes.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Error fetching customers', error });
    }
});

customerRoutes.get('/', async (req, res) => {
    try {
        // Fetch all customers from the database
        const customers = await Customer.find();

        // Send the customer data as a response
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Error fetching customers' });
    }
});

customerRoutes.post('/addnewcustomer', async (req, res) => {
    try {
        const { name, flatNo, societyName, email, totalPending, purchases, startDate, lastPurchase, status } = req.body;

        // Validate required fields
        if (!name || !societyName || !email || totalPending < 0) {
            return res.status(400).json({ message: "Please provide valid customer details." });
        }

        const newCustomer = new Customer({
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
        console.error("Database save error:", dbError);
        res.status(500).json({ message: "Database save failed", error: dbError });
    }
});

customerRoutes.put('/:customerId/updatepurchase', async (req, res) => {
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

customerRoutes.put('/:customerId/markAsPaid', async (req,res) => {
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

customerRoutes.delete('/:customerId/deleteCustomer', async (req, res) => {
    const { customerId } = req.params;  // customerId is extracted from the route parameter

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

customerRoutes.put('/:customerId/updatePurchases', async (req, res) => {
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


export { customerRoutes };
