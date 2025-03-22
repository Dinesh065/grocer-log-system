import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const StockAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(0);

  const fetchFestivalData = async () => {
    try {
      const apiKey = "ScftEuhUctcBzGDDpxABhB4vZFAQy9sE";
      const country = "IN";
      const year = new Date().getFullYear();

      const response = await axios.get(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`);

      const holidays = response.data.response.holidays;

      const today = new Date();
      const upcomingFestivals = holidays
        .filter((holiday) => {
          const holidayDate = new Date(holiday.date.iso);
          const diffInDays = Math.ceil((holidayDate - today) / (1000 * 60 * 60 * 24));
          return diffInDays >= 0 && diffInDays <= 7;
        })
        .map((holiday) => ({
          message: `${holiday.name} is coming! Prepare now.`,
          link: "/inventory",
          cta: "Stock Up Now",
          color: "text-green-500",
        }));

      return upcomingFestivals;
    } catch (error) {
      console.error("Error fetching festival data:", error);
      return [];
    }
  };

  const fetchStockAlerts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/inventory/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const stockAlerts = response.data
        .filter((item) => item.status === "Low Stock" || item.status === "Out of Stock")
        .map((item) => ({
          message: `${item.name} is ${item.status.toLowerCase()}`,
          link: "/inventory",
          cta: "Check Inventory",
          color: item.status === "Low Stock" ? "text-yellow-500" : "text-red-500",
        }));

      return stockAlerts;
    } catch (error) {
      console.error("Error fetching stock alerts:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      const festivalAlerts = await fetchFestivalData();
      const stockAlerts = await fetchStockAlerts();

      setAlerts([...festivalAlerts, ...stockAlerts]);
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    if (alerts.length > 0) {
      const interval = setInterval(() => {
        setCurrentAlert((prevAlert) => (prevAlert + 1) % alerts.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [alerts]);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="stock-alert-container bg-[#0d1321] p-4 rounded-lg shadow-lg">
      <div className="stock-alert-message text-center">
        <p className={`font-semibold ${alerts[currentAlert].color}`}>
          {alerts[currentAlert].message}{" "}
          <span>| </span>
          <Link to={alerts[currentAlert].link} className="text-[#00A6FB] underline">
            {alerts[currentAlert].cta}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StockAlert;
