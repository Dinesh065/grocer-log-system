// Dashboard.jsx
import React from 'react';
import DashboardHeader from './DashboardHeader';
import StockAlert from './StockAlert';
import DashboardItems from './DashboardItems';
import DashboardGraph from './DashboardGraph';
import Footer from './Footer';

const Dashboard = () => {
    return (
        <div style={{ backgroundColor: 'rgba(255, 228, 196, 0.8)', minHeight: '100vh', width: '100%'}}>
            <StockAlert />
            <DashboardHeader />
            <DashboardItems/>
            <DashboardGraph/>
            <Footer/>
        </div>
    );
};

export default Dashboard;
