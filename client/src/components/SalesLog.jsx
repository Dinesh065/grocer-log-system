import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Icon
// import AddNewSaleForm from "./AddNewSaleForm"; // Assuming this is a separate form component

const SalesLog = () => {
    const [showAddNewSaleForm, setShowAddNewSaleForm] = useState(false);
    const [filter, setFilter] = useState({ startDate: "", endDate: "" });

    const initialData = [
        { date: "2024-10-02", product: "Product B", quantity: 5, pricePerQuantity: 100, total: 500 },
    ];

    const loadSalesFromLocalStorage = () => {
        const storedSales = localStorage.getItem('salesData');
        return storedSales ? JSON.parse(storedSales) : initialData;
    };

    const [sales, setSales] = useState(loadSalesFromLocalStorage());
    const [filteredSales, setFilteredSales] = useState(sales);
    const [newSale, setNewSale] = useState({
        product: '',
        date: '',
        quantity: '',
        pricePerQuantity: 0
    });

    useEffect(() => {
        localStorage.setItem('salesData', JSON.stringify(sales));
        setFilteredSales(sales);
    }, [sales]);

    const handleAddSale = () => {
        if (!newSale.product || !newSale.date || newSale.quantity <= 0 || newSale.pricePerQuantity <= 0) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const total = newSale.quantity * newSale.pricePerQuantity;
        const saleWithTotal = { ...newSale, total, id: Date.now() };
        setSales([...sales, saleWithTotal]);
        setNewSale({ product: '', date: '', quantity: 0, pricePerQuantity: 0 });
        setShowAddNewSaleForm(false);
    };

    const handleDateFilter = () => {
        const filtered = sales.filter(sale => {
            const saleDate = new Date(sale.date);
            const startDate = new Date(filter.startDate);
            const endDate = new Date(filter.endDate);
            return saleDate >= startDate && saleDate <= endDate;
        });
        setFilteredSales(filtered);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ backgroundColor: 'rgba(255, 228, 196, 0.8)', minHeight: '100vh', padding: '20px' }}>
            <h1 className="text-center bg-pink-200 text-pink-700 shadow-lg font-bold py-4 rounded-lg text-4xl mb-6">
                Welcome to the Sales Log!
            </h1>

            <div className="mb-8 bg-blue-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-blue-700">Sales Summary: {filteredSales.length} Total Sales</h2>
            </div>

            <div className="bg-slate-300 shadow-lg rounded-lg p-4">
                <div className="flex items-center mb-8 justify-between">
                    <div className="bg-white shadow-lg rounded-lg p-2 flex-grow mr-4 border border-gray-300">
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Filter Sales by Date</h2>
                        <div className="flex items-center">
                            <div className="flex space-x-2 items-center flex-grow">
                                <input
                                    type="date"
                                    name="startDate"
                                    value={filter.startDate}
                                    onChange={handleFilterChange}
                                    className="p-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 flex-grow border-gray-400"
                                    style={{ maxWidth: '400px' }}
                                />
                                <span className="text-lg text-gray-600">to</span>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={filter.endDate}
                                    onChange={handleFilterChange}
                                    className="p-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 flex-grow border-gray-400"
                                    style={{ maxWidth: '400px' }}
                                />
                            </div>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                                onClick={handleDateFilter}
                            >
                                Filter
                            </button>
                        </div>
                    </div>

                    <button
                        className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 shadow-md transition duration-300 ease-in-out"
                        onClick={() => setShowAddNewSaleForm(true)} // Show form
                    >
                        <FaShoppingCart className="mr-2 text-lg" />
                        Add New Sale
                    </button>
                </div>

                {showAddNewSaleForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                            <h2 className="text-lg font-bold mb-4">Add New Sale</h2>
                            <div>
                                <input
                                    type="text"
                                    name="product"
                                    value={newSale.product}
                                    onChange={e => setNewSale({ ...newSale, product: e.target.value })}
                                    placeholder="Product Name"
                                    className="p-2 border rounded-lg w-full mb-2"
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={newSale.date}
                                    onChange={e => setNewSale({ ...newSale, date: e.target.value })}
                                    className="p-2 border rounded-lg w-full mb-2"
                                />
                                <input
                                    type="number"
                                    name="quantity"
                                    value={newSale.quantity}
                                    onChange={e => setNewSale({ ...newSale, quantity: Number(e.target.value) })}
                                    placeholder="Quantity"
                                    className="p-2 border rounded-lg w-full mb-2"
                                />
                                <input
                                    type="number"
                                    name="pricePerQuantity"
                                    value={newSale.pricePerQuantity}
                                    onChange={e => setNewSale({ ...newSale, pricePerQuantity: Number(e.target.value) })}
                                    placeholder="Price per Unit"
                                    className="p-2 border rounded-lg w-full mb-2"
                                />
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                                    onClick={handleAddSale}
                                >
                                    Add Sale
                                </button>
                            </div>
                            <button
                                className="mt-4 text-red-500"
                                onClick={() => setShowAddNewSaleForm(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Sales Log</h3>
                <div className="overflow-x-auto">
                    <table
                        className="w-full max-w-5xl mx-auto table-auto border-collapse border border-gray-300"
                        style={{ padding: '10px', maxWidth: '95%' }}
                    >
                        <thead>
                            <tr className="bg-blue-200 text-left">
                                <th className="px-4 py-2 border text-gray-700">Date</th>
                                <th className="px-4 py-2 border text-gray-700">Product</th>
                                <th className="px-4 py-2 border text-gray-700">Quantity</th>
                                <th className="px-4 py-2 border text-gray-700">Price per Quantity</th>
                                <th className="px-4 py-2 border text-gray-700">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSales.map((sale, index) => (
                                <tr
                                    key={index}
                                    className={`text-gray-800 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                                >
                                    <td className="px-4 py-2 border">{sale.date}</td>
                                    <td className="px-4 py-2 border">{sale.product}</td>
                                    <td className="px-4 py-2 border">{sale.quantity}</td>
                                    <td className="px-4 py-2 border">${sale.pricePerQuantity}</td>
                                    <td className="px-4 py-2 border">${sale.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesLog;
