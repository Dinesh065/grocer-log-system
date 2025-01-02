// Dashboard.jsx
import React from 'react';
import DashboardHeader from './DashboardHeader';
import StockAlert from './StockAlert';
import DashboardItems from './DashboardItems';
import DashboardGraph from './DashboardGraph';
import Footer from './Footer';

const Dashboard = () => {
    return (
        <div  style={{ backgroundColor: 'rgba(255, 228, 196, 0.8)', minHeight: '100vh', padding: '20px' }}>
            <h1 className="text-center bg-pink-200 text-pink-700 shadow-lg font-bold py-4 rounded-lg text-4xl mb-6">
                Welcome to the Dashboard!
            </h1>
            <StockAlert />
            <DashboardHeader />
            <DashboardItems />
            {/* <DashboardGraph /> */}
            <Footer />
        </div>
    );
};

export default Dashboard;
