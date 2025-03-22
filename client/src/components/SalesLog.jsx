import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useDashboard } from "./DashboardContext";
import Footer from "./Footer";
import { API_BASE_URL } from "../config";

const SalesLog = () => {
    const [showAddNewSaleForm, setShowAddNewSaleForm] = useState(false);
    const [filter, setFilter] = useState({ startDate: "", endDate: "" });
    const { setDashboardData } = useDashboard();

    const fetchSalesFromBackend = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`${API_BASE_URL}/sales/getsales`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setSales(response.data);
                setFilteredSales(response.data);
            } else {
                console.error("Failed to fetch sales data. Status:", response.status);
                alert("Failed to load sales data. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
            alert("Error fetching sales data. Please check the server.");
        }
    };

    useEffect(() => {
        fetchSalesFromBackend();
    }, []);

    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState(sales);
    const [newSale, setNewSale] = useState({
        product: '',
        date: '',
        quantity: '',
        pricePerQuantity: 0
    });

    useEffect(() => {
        const totalSales = filteredSales.reduce((acc, sale) => acc + sale.total, 0);

        setDashboardData((prev) => ({
            ...prev,
            totalSales,
        }));
    }, [filteredSales, setDashboardData]);

    const handleAddSale = async () => {
        if (!newSale.product || !newSale.date || newSale.quantity <= 0 || newSale.pricePerQuantity <= 0) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const total = newSale.quantity * newSale.pricePerQuantity;
        const saleWithTotal = { ...newSale, total, id: Date.now() };
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${API_BASE_URL}/sales/addnewsale`, saleWithTotal, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setSales([...sales, response.data]);
                setNewSale({ product: '', date: '', quantity: 0, pricePerQuantity: 0 });
                setShowAddNewSaleForm(false);
                console.log("Sale added successfully.")
            } else {
                alert("Failed to add sale. Please try again.");
            }
        } catch (error) {
            console.error("Error adding new sale:", error);
            alert("Error adding new sale. Please try again.");
        }
    }

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
        <div>
            <div style={{ backgroundColor: '#050a14', minHeight: '100vh', padding: '20px' }}>
                <div className="mb-8 bg-gray-900 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-200">Sales Summary: {filteredSales.length} Total Sales</h2>
                </div>

                <div className="bg-gray-800 shadow-lg rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row items-center mb-8 space-y-2 sm:space-y-0 sm:space-x-4 justify-between w-full">
                        <div className="bg-gray-700 shadow-lg rounded-lg p-2 flex-grow border border-gray-600">
                            <h2 className="text-lg font-semibold mb-2 text-gray-200">Filter Sales by Date</h2>
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-grow">
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={filter.startDate}
                                        onChange={handleFilterChange}
                                        className="p-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 flex-grow border-gray-500 bg-gray-600 text-gray-200"
                                    />
                                    <span className="text-lg text-gray-400">to</span>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={filter.endDate}
                                        onChange={handleFilterChange}
                                        className="p-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 flex-grow border-gray-500 bg-gray-600 text-gray-200"
                                    />
                                </div>
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                                    onClick={handleDateFilter}
                                >
                                    Filter
                                </button>
                            </div>
                        </div>

                        <button
                            className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 shadow-md transition duration-300 ease-in-out"
                            onClick={() => setShowAddNewSaleForm(true)}
                        >
                            <FaShoppingCart className="mr-2 text-lg" />
                            Add New Sale
                        </button>
                    </div>

                    {showAddNewSaleForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-2 sm:p-0">
                            <div className="bg-gray-900 p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
                                <h2 className="text-lg font-bold mb-4 text-gray-200">Add New Sale</h2>
                                <div>
                                    <input
                                        type="text"
                                        name="product"
                                        value={newSale.product}
                                        onChange={e => setNewSale({ ...newSale, product: e.target.value })}
                                        placeholder="Product Name"
                                        className="p-2 border rounded-lg w-full mb-2 shadow-lg border-gray-600 bg-gray-700 text-gray-200"
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={newSale.date}
                                        onChange={e => setNewSale({ ...newSale, date: e.target.value })}
                                        className="p-2 border rounded-lg w-full mb-2 shadow-lg border-gray-600 bg-gray-700 text-gray-200"
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={newSale.quantity}
                                        onChange={e => setNewSale({ ...newSale, quantity: Number(e.target.value) })}
                                        placeholder="Quantity"
                                        className="p-2 border rounded-lg w-full mb-2 shadow-lg border-gray-600 bg-gray-700 text-gray-200"
                                    />
                                    <input
                                        type="number"
                                        name="pricePerQuantity"
                                        value={newSale.pricePerQuantity}
                                        onChange={e => setNewSale({ ...newSale, pricePerQuantity: Number(e.target.value) })}
                                        placeholder="Price per Unit"
                                        className="p-2 border rounded-lg w-full mb-2 shadow-lg border-gray-600 bg-gray-700 text-gray-200"
                                    />
                                    <button
                                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                                        onClick={handleAddSale}
                                    >
                                        Add Sale
                                    </button>
                                </div>
                                <button
                                    className="mt-4 text-red-400 hover:text-red-500"
                                    onClick={() => setShowAddNewSaleForm(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    <h3 className="text-2xl font-semibold mb-4 text-gray-200">Sales Log</h3>
                    <div className="overflow-x-auto">
                        <table
                            className="w-full max-w-5xl mx-auto table-auto border-collapse border border-gray-600"
                            style={{ padding: '10px', maxWidth: '95%' }}
                        >
                            <thead>
                                <tr className="bg-gray-700 text-left">
                                    <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2   text-gray-300">Date</th>
                                    <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2   text-gray-300">Product</th>
                                    <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2   text-gray-300">Quantity</th>
                                    <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2   text-gray-300">Price per Quantity</th>
                                    <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2   text-gray-300">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSales.map((sale, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} text-gray-200`}
                                    >
                                        <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2  ">{sale.date}</td>
                                        <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2  ">{sale.product}</td>
                                        <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2  ">{sale.quantity}</td>
                                        <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2  ">₹{sale.pricePerQuantity}</td>
                                        <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2  ">₹{sale.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>

    );
};

export default SalesLog;
