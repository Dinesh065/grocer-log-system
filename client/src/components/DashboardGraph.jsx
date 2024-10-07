import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DashboardGraph = () => {

    const barData = {
        labels: ['Item A', 'Item B', 'Item C'],
        datasets: [
            {
                label: 'Quantity',
                data: [10, 3, 50],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
                label: 'Stock Value ($)',
                data: [12000, 15000, 14000, 15200],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="grid grid-cols-2 gap-4 px-8 py-6">
            <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">Inventory Quantity</h2>
                <Bar data={barData} options={barOptions} />
            </div>

            <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">Stock Value Over Time</h2>
                <Line data={lineData} options={lineOptions} />
            </div>
        </div>
    );
};

export default DashboardGraph;
