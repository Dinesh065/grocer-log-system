import React from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "./DashboardContext";

const DashboardCards = () => {

    const { dashboardData } = useDashboard();

    // Dummy data for total items, low stock, and stock value
    // const totalItems = 120;
    // const lowStockItems = 5;
    // const stockValue = "$15,200";
    // const totalCredits = "$3,500";
    // const totalSales = "$25,000";
    const navigate = useNavigate();

    const handleTotalItem = () => {
        navigate("/inventory");
    }
    const hadnleTotalCredits = () => {
        navigate("/credits");
    }
    const hadnleTotalSales = () => {
        navigate("/sales");
    }

    // Dummy data for a few inventory entries
    const inventoryEntries = [
        { id: 1, name: "Item A", sku: "001", quantity: 10 },
        { id: 2, name: "Item B", sku: "002", quantity: 3 },
        { id: 3, name: "Item C", sku: "003", quantity: 50 },
    ];

    // Dummy data for entries
    const creditEntries = [
        { id: 1, customer: "John Doe", credit: "$500" },
        { id: 2, customer: "Jane Smith", credit: "$200" },
        { id: 3, customer: "Bob Johnson", credit: "$700" },
    ];

    const salesEntries = [
        { id: 1, item: "Product A", amount: "$1200" },
        { id: 2, item: "Product B", amount: "$800" },
        { id: 3, item: "Product C", amount: "$4500" },
    ];

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
                    <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={hadnleTotalSales}>View More</button>
                </div>

                {/* Total Credit*/}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Credits</h2>
                    <p className="text-3xl font-bold">{dashboardData.totalCredits}</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={hadnleTotalCredits}>View More</button>
                </div>

                {/* Inventory Entries Section */}
                <div className="col-span-3 bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Inventory Entries</h2>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">SKU</th>
                                <th className="px-4 py-2">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryEntries.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.sku}</td>
                                    <td className="px-4 py-2">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View More</button>
                        {/* <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button> */}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 px-8 py-6">
                {/* Customer Credit Log Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Customer Credit Log</h2>
                    {/* <p className="text-3xl font-bold">{dashboardData.totalCredits}</p> */}
                    <table className="w-full table-auto mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Customer</th>
                                <th className="px-4 py-2">Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {creditEntries.map((entry) => (
                                <tr key={entry.id} className="border-t">
                                    <td className="px-4 py-2">{entry.customer}</td>
                                    <td className="px-4 py-2">{entry.credit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View More</button>
                        {/* <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button> */}
                    </div>
                </div>

                {/* Sales Log Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Sales Log</h2>
                    {/* <p className="text-3xl font-bold">{dashboardData.totalSales}</p> */}
                    <table className="w-full table-auto mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Item</th>
                                <th className="px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesEntries.map((entry) => (
                                <tr key={entry.id} className="border-t">
                                    <td className="px-4 py-2">{entry.item}</td>
                                    <td className="px-4 py-2">{entry.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View More</button>
                        {/* <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Update</button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardCards;
