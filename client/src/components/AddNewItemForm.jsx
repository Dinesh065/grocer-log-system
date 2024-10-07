import React, { useState } from 'react';

const AddNewItemForm = ({ handleAddNewItem }) => {
    const [newItem, setNewItem] = useState({
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        sku: '',
        qty: 0,
        status: 'In stock',
        dateAdded: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddNewItem(newItem);
    };

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <input type="text" name="name" value={newItem.name} onChange={handleChange} placeholder="Item Name" required />
            <input type="text" name="sku" value={newItem.sku} onChange={handleChange} placeholder="SKU" required />
            <input type="number" name="qty" value={newItem.qty} onChange={handleChange} placeholder="Quantity" required />
            <select name="status" value={newItem.status} onChange={handleChange}>
                <option value="In stock">In Stock</option>
                <option value="Low">Low</option>
                <option value="Out of stock">Out of Stock</option>
            </select>
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddNewItemForm;
