import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import '../App.css';

const BillModal = ({ selectedCustomer, sendBillEmail, setShowBillModal }) => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">Loading...</div>;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 sm:w-[85%] md:w-[70%] lg:w-96 relative">
                <h2 className="text-xl font-bold mb-4 text-center text-white">TAX INVOICE</h2>

                <h3 className="text-lg font-semibold text-center text-white">{profile.groceryName}</h3>
                <p className="text-center text-gray-300">{profile.groceryAddress}</p>
                <p className="text-center text-gray-300">
                    <strong>Phone:</strong> {profile.phoneNumber}
                </p>
                <hr className="my-4 border-gray-600" />

                <h3 className="text-lg font-semibold text-white">BILL TO:</h3>
                <p className="text-gray-300">
                    <strong>{selectedCustomer.name}</strong>
                </p>
                <p className="text-gray-300">
                    <strong>Flat No:</strong> {selectedCustomer.flatNo}
                </p>
                <p className="text-gray-300">
                    <strong>Society:</strong> {selectedCustomer.societyName}
                </p>
                <hr className="my-4 border-gray-600" />

                <table className="table-auto w-full text-sm sm:text-base text-gray-300">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="px-2 py-1 text-gray-900 border border-gray-600">Sr. No.</th>
                            <th className="px-2 py-1 text-gray-900 border border-gray-600">Item</th>
                            <th className="px-2 py-1 text-gray-900 border border-gray-600">Qty</th>
                            <th className="px-2 py-1 text-gray-900 border border-gray-600">Price</th>
                            <th className="px-2 py-1 text-gray-900 border border-gray-600">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedCustomer.purchases.map((purchase, idx) => (
                            <tr key={idx}>
                                <td className="px-2 text-gray-700 py-1 border border-gray-600 text-center">{idx + 1}</td>
                                <td className="px-2 text-gray-700 py-1 border border-gray-600 text-center">{purchase.name}</td>
                                <td className="px-2 text-gray-700 py-1 border border-gray-600 text-center">{purchase.quantity}</td>
                                <td className="px-2 text-gray-700 py-1 border border-gray-600 text-center">${purchase.pricePerItem}</td>
                                <td className="px-2 text-gray-700 py-1 border border-gray-600 text-center">${purchase.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <hr className="my-4 border-gray-600" />

                <p className="text-right text-sm sm:text-base text-gray-300">
                    <strong>Total Pending:</strong> ${selectedCustomer.totalPending}
                </p>

                <button
                    onClick={() => sendBillEmail(profile)}
                    className="bg-blue-600 text-white p-2 rounded mt-2 w-full text-sm sm:text-base hover:bg-blue-700 transition"
                >
                    Send Bill
                </button>
                <button
                    onClick={() => setShowBillModal(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white text-sm sm:text-base"
                >
                    Close
                </button>
            </div>
        </div>

    );
}
export default BillModal;
