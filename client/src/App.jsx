import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import InventoryManagement from './components/InventoryManagement';
import SalesLog from './components/SalesLog';
import CustomerCreditLog from './components/CustomerCreditLog';
import AddSale from './components/AddNewSaleForm';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import LandingPage from './components/LandingPage';
import { DashboardProvider } from './components/DashboardContext';
import Logout from './components/auth/Logout';
import Profile from './components/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem('token');
      const demoToken = sessionStorage.getItem('demoToken');
      setIsAuthenticated(!!token || !!demoToken);
    };
  
    syncAuthState(); 
  
    window.addEventListener('storage', syncAuthState); // Listen for changes
    return () => window.removeEventListener('storage', syncAuthState);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('demoToken');
    setIsAuthenticated(false); 
  };

  return (
    <DashboardProvider>
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <main className="main-content">
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<InventoryManagement />} />
                <Route path="/sales" element={<SalesLog />} />
                <Route path="/credits" element={<CustomerCreditLog />} />
                <Route path="/add-sale" element={<AddSale />} />
                <Route path="/sales-log" element={<SalesLog />} />
                <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </DashboardProvider>
  );
}

export default App;