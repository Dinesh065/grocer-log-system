import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StockAlert.css';

const StockAlert = () => {
  const alerts = [
    { message: "Low stock on Item A", link: "/inventory", cta: "Check Inventory", color: "text-red-500" },
    { message: "Item B out of stock", link: "/inventory", cta: "Restock Now", color: "text-yellow-500" },
    { message: "New order placed for Item C", link: "/orders", cta: "View Orders", color: "text-green-500" },
    { message: "Stock level critical for Item D", link: "/inventory", cta: "Check Now", color: "text-orange-500" }
  ];

  const [currentAlert, setCurrentAlert] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prevAlert) => (prevAlert + 1) % alerts.length);
    }, 8000); // Change alert every 8 seconds

    return () => clearInterval(interval);
  }, [alerts.length]);

  return (
    <div className="stock-alert-container">
      <div className="stock-alert-message">
        <p className={`font-semibold ${alerts[currentAlert].color}`}>
          {alerts[currentAlert].message}{" "}
          <span>| </span>
          <Link to={alerts[currentAlert].link} className="text-blue-600 underline">
            {alerts[currentAlert].cta}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StockAlert;
