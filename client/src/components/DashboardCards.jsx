import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
                const response = await axios.get("http://localhost:8000/api/v1/dashboard");
                console.log(response.data);
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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 px-8 py-6">
                {/* Total Items Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Items</h2>
                    <p className="text-3xl font-bold">{dashboardData.totalItems}</p>
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleTotalItem}>View More</button>
                </div>

                {/*Total Sales*/}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                    <p className="text-3xl font-bold">{dashboardData.totalSales}</p>
                    <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={handleTotalSales}>View More</button>
                </div>

                {/* Total Credit*/}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Credits</h2>
                    <p className="text-3xl font-bold">{dashboardData.totalCredits}</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleTotalCredits}>View More</button>
                </div>

                {/* Inventory Entries Section */}
                <div className="col-span-3 bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Inventory Entries</h2>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.inventoryEntries.map((entry) => (
                                <tr key={entry._id} className="border-t">
                                    <td className="px-4 py-2">{entry.name}</td>
                                    <td className="px-4 py-2">{entry.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <button onClick={handleTotalItem} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View More</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 px-8 py-6">
                {/* Customer Credit Log Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Customer Credit Log</h2>
                    <table className="w-full table-auto mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Customer</th>
                                <th className="px-4 py-2">Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.creditEntries.map((entry) => (
                                <tr key={entry._id} className="border-t">
                                    <td className="px-4 py-2">{entry.name}</td>
                                    <td className="px-4 py-2">{entry.totalPending}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <button  onClick={handleTotalCredits} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View More</button>
                    </div>
                </div>

                {/* Sales Log Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Sales Log</h2>
                    <table className="w-full table-auto mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Item</th>
                                <th className="px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.salesEntries.map((entry) => (
                                <tr key={entry._id} className="border-t">
                                    <td className="px-4 py-2">{entry.product}</td>
                                    <td className="px-4 py-2">{entry.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <button onClick={handleTotalSales} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View More</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardCards;

// useEffect(() => {
//     const fetchDashboardData = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get("http://localhost:8000/api/v1/dashboard",{
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log(response.data);
//             setDashboardData(response.data);
//         } catch (error) {
//             console.error("Error fetching dashboard data:", error.response?.data || error.message);
//         }
//     };

//     fetchDashboardData();
// }, []);
