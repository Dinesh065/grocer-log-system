import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import InventoryManagement from './components/InventoryManagement.jsx';
import SalesLog from './components/SalesLog.jsx';
import CustomerCreditLog from './components/CustomerCreditLog.jsx';
import AddSale from './components/AddNewSaleForm.jsx';

function App() {
  return (
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
          <Route path="/add-sale" element={<AddSale/>} />
          <Route path="/sales-log" element={<SalesLog/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
