import React, { useEffect, useState } from 'react';
import StockAlert from './StockAlert';
import DashboardItems from './DashboardItems';
import Footer from './Footer';

const Dashboard = () => {
    const [username, setUsername] = useState("User");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            try {
                const response = await fetch('http://localhost:8000/api/v1/users/userInfo', {
                    headers: { Authorization: token }
                });
                const data = await response.json();
                if (response.ok) {
                    setUsername(data.name);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <div className="bg-[#050a14] min-h-screen p-6 text-gray-200">
                <h1 className='font-bold text-4xl'>
                    Dashboard
                 </h1>
                <p className='mb-8 text-gray-400'>Hi {username}, here are your log's overview</p>
                <StockAlert />
                <DashboardItems />
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
