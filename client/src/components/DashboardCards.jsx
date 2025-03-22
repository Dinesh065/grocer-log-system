import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const DashboardCards = () => {
    const [dashboardData, setDashboardData] = useState({
        totalItems: 0,
        totalCredits: 0,
        totalSales: 0,
        inventoryEntries: [],
        creditEntries: [],
        salesEntries: []
    });
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`${API_BASE_URL}/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const handleTotalItem = () => {
        navigate("/inventory");
    };
    const handleTotalCredits = () => {
        navigate("/credits");
    };
    const handleTotalSales = () => {
        navigate("/sales");
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 py-6">
                <div className="bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-lg p-6">
                    <h2 className="text-xl text-white font-semibold mb-2">Total Items</h2>
                    <p className="text-3xl text-white font-bold">{dashboardData.totalItems}</p>
                    <button
                        className="mt-4 hover:bg-blue-600  text-white py-2 px-4 rounded border border-gray-600 w-full md:w-auto"
                        onClick={handleTotalItem}
                    >
                        View More
                    </button>
                </div>

                <div className="bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-lg p-6">
                    <h2 className="text-xl text-white font-semibold mb-2">Total Sales</h2>
                    <p className="text-3xl text-white font-bold">{dashboardData.totalSales}</p>
                    <button
                        className="mt-4 hover:bg-red-600 text-white py-2 px-4 rounded border border-gray-600 w-full md:w-auto"
                        onClick={handleTotalSales}
                    >
                        View More
                    </button>
                </div>

                <div className="bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-lg p-6">
                    <h2 className="text-xl text-white font-semibold mb-2">Total Credits</h2>
                    <p className="text-3xl text-white font-bold">{dashboardData.totalCredits}</p>
                    <button
                        className="mt-4 text-white py-2 px-4 rounded border hover:bg-green-700 border-gray-600 shadow-md w-full md:w-auto"
                        onClick={handleTotalCredits}
                    >
                        View More
                    </button>
                </div>
            </div>

            <div className="px-4 sm:px-8 py-6">
                <div className="bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-lg p-6">
                    <h2 className="text-xl text-white font-semibold mb-4">Inventory Entries</h2>
                    <table className="w-full  table-auto text-sm border-collapse">
                        <thead>
                            <tr className="">
                                <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2">Name</th>
                                <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.inventoryEntries.map((entry) => (
                                <tr key={entry._id} className="border-t">
                                    <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2">{entry.name}</td>
                                    <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2  text-gray-400 px-4 py-2">{entry.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleTotalItem}
                            className="bg-[#0d1321] text-white py-2 px-4 rounded hover:bg-blue-600 border border-gray-600 shadow-md"
                        >
                            View More
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-4 sm:px-8 py-6">
                <div className="bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Customer Credit Log</h2>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="">
                                <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2">Customer</th>
                                <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2">Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.creditEntries.map((entry) => (
                                <tr key={entry._id} className="border-t">
                                    <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2">{entry.name}</td>
                                    <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2">{entry.totalPending}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleTotalCredits}
                            className="bg-[#0d1321] text-white py-2 px-4 rounded hover:bg-blue-600 border border-gray-600 shadow-md"
                        >
                            View More
                        </button>
                    </div>
                </div>

                <div className="bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Sales Log</h2>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2">Item</th>
                                <th className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.salesEntries.map((entry) => (
                                <tr key={entry._id} className="border-t">
                                    <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2">{entry.product}</td>
                                    <td className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400 px-4 py-2">{entry.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleTotalSales}
                            className="bg-[#0d1321] text-white py-2 px-4 rounded hover:bg-blue-600 border border-gray-600 shadow-md"
                        >
                            View More
                        </button>
                    </div>

                </div>
            </div>
        </>
    );

};

export default DashboardCards;