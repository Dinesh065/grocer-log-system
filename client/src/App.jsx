import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import InventoryManagement from './components/InventoryManagement.jsx';
import SalesLog from './components/SalesLog.jsx';
import CustomerCreditLog from './components/CustomerCreditLog.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import LandingPage from './components/LandingPage';
import { DashboardProvider } from './components/DashboardContext.jsx';
import Logout from './components/auth/Logout.jsx';
import Profile from './components/Profile.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem('token');
      const demoToken = sessionStorage.getItem('demoToken');
      setIsAuthenticated(!!token || !!demoToken);
    };
  
    syncAuthState(); 
  
    window.addEventListener('storage', syncAuthState); 
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