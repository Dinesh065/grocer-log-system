import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import InventoryManagement from './components/InventoryManagement.jsx';
import SalesLog from './components/SalesLog.jsx';
import CustomerCreditLog from './components/CustomerCreditLog.jsx';
import AddSale from './components/AddNewSaleForm.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import LandingPage from './components/LandingPage.jsx';
import { DashboardProvider } from './components/DashboardContext.jsx';

function App() {
  return (
    <DashboardProvider>
      <div className="app-container">
        {/* Sidebar */}
        <Sidebar />

        {/* Scrollable Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/sales" element={<SalesLog />} />
            <Route path="/credits" element={<CustomerCreditLog />} />
            <Route path="/add-sale" element={<AddSale />} />
            <Route path="/sales-log" element={<SalesLog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/landingpage" element={<LandingPage />} />
          </Routes>
        </main>
      </div>
    </DashboardProvider>
  );
}

export default App;