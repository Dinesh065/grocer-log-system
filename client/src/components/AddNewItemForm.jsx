import React, { useState } from "react";

const AddNewItemForm = ({ handleAddNewItem }) => {
    const [newItem, setNewItem] = useState({
        name: "",
        qty: 0,
        status: "In stock",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({
            ...prevItem,
            [name]: name === "qty" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddNewItem(newItem);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="new-item-form bg-[#0d1321] shadow-md rounded-lg p-6 max-w-md mx-auto space-y-4"
        >
            <h2 className="text-2xl font-semibold text-white text-center mb-4">
                Add New Item
            </h2>

            <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-300 font-medium">
                    Item Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleChange}
                    placeholder="Item Name"
                    required
                    className="border border-gray-600 bg-[#0d1321] text-white rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="qty" className="text-gray-300 font-medium">
                    Quantity
                </label>
                <input
                    type="number"
                    name="qty"
                    value={newItem.qty}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                    className="border border-gray-600 bg-[#0d1321] text-white rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#30336b] hover:bg-[#535c91] text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
                Add Item
            </button>
        </form>
    );
};

export default AddNewItemForm;
