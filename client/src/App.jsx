import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import InventoryManagement from './components/InventoryManagement.jsx';
import SalesLog from './components/SalesLog.jsx';
import CustomerCreditLog from './components/CustomerCreditLog.jsx';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/sales" element={<SalesLog />} />
          <Route path="/credits" element={<CustomerCreditLog />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
