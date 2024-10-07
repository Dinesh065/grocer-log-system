 import React, { useState } from 'react';

const AddNewSaleForm = ({ handleAddNewSale }) => {
    const [newSale, setNewSale] = useState({
        product: '',
        quantity: 0,
        pricePerQuantity: 0,
        date: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSale({ ...newSale, [name]: value });

        // Calculate total whenever quantity or price changes
        if (name === "quantity" || name === "pricePerQuantity") {
            const quantity = parseFloat(newSale.quantity) || 0;
            const pricePerQuantity = parseFloat(newSale.pricePerQuantity) || 0;
            newSale.total = (quantity * pricePerQuantity).toFixed(2); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure total is calculated before adding
        const quantity = parseFloat(newSale.quantity) || 0;
        const pricePerQuantity = parseFloat(newSale.pricePerQuantity) || 0;
        newSale.total = (quantity * pricePerQuantity).toFixed(2);  
        handleAddNewSale(newSale);  
        setNewSale({ product: '', quantity: 0, pricePerQuantity: 0, date: new Date().toISOString().split('T')[0] }); 
    };

    return (
        <form onSubmit={handleSubmit} className="new-sale-form">
            <input
                type="text"
                name="product"
                value={newSale.product}
                onChange={handleChange}
                placeholder="Product Name"
                required
            />
            <input
                type="number"
                name="quantity"
                value={newSale.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
            />
            <input
                type="number"
                name="pricePerQuantity"
                value={newSale.pricePerQuantity}
                onChange={handleChange}
                placeholder="Price per Quantity"
                required
            />
            <input
                type="date"
                name="date"
                value={newSale.date}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Sale</button>
        </form>
    );
};

export default AddNewSaleForm;
