import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [dashboardData, setDashboardData] = useState({
        totalItems: 0,
        lowStockItems: 0,
        stockValue: '',
        totalCredits: '',
        totalSales: '',
        inventoryEntries: [],
        creditEntries: [],
        salesEntries: []
    });

    return (
        <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);