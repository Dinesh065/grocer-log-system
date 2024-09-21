import React from "react";
import DashboardHeader from "./DashboardHeader";

const Inventory = () => {
    return (
        <div style={{ backgroundColor: 'rgba(255, 228, 196, 0.8)', minHeight: '100vh', width: '100%'}}>
            <h1 className="text-center bg-[pink] text-[#f62f50] shadow-md font-bold">Welcome to the Inventory Management !!</h1>
            <DashboardHeader/>
            
        </div>
    )
}

export default Inventory;