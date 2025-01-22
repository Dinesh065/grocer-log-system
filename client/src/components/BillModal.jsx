import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const BillModal = ({ selectedCustomer, sendBillEmail, setShowBillModal }) => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/users/me', {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 sm:w-[85%] md:w-[70%] lg:w-96 relative">
                <h2 className="text-xl font-bold mb-4 text-center">TAX INVOICE</h2>

                <h3 className="text-lg font-semibold text-center">{profile.groceryName}</h3>
                <p className="text-center">{profile.groceryAddress}</p>
                <p className="text-center">
                    <strong>Phone:</strong> {profile.phoneNumber}
                </p>
                <hr className="my-4" />

                <h3 className="text-lg font-semibold">BILL TO:</h3>
                <p>
                    <strong>{selectedCustomer.name}</strong>
                </p>
                <p>
                    <strong>Flat No:</strong> {selectedCustomer.flatNo}
                </p>
                <p>
                    <strong>Society:</strong> {selectedCustomer.societyName}
                </p>
                <hr className="my-4" />

                <table className="table-auto w-full text-sm sm:text-base">
                    <thead>
                        <tr>
                            <th className="px-2 py-1 border">Sr. No.</th>
                            <th className="px-2 py-1 border">Item</th>
                            <th className="px-2 py-1 border">Qty</th>
                            <th className="px-2 py-1 border">Price</th>
                            <th className="px-2 py-1 border">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedCustomer.purchases.map((purchase, idx) => (
                            <tr key={idx}>
                                <td className="px-2 py-1 border text-center">{idx + 1}</td>
                                <td className="px-2 py-1 border text-center">{purchase.name}</td>
                                <td className="px-2 py-1 border text-center">{purchase.quantity}</td>
                                <td className="px-2 py-1 border text-center">${purchase.pricePerItem}</td>
                                <td className="px-2 py-1 border text-center">${purchase.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <hr className="my-4" />

                <p className="text-right text-sm sm:text-base">
                    <strong>Total Pending:</strong> ${selectedCustomer.totalPending}
                </p>

                <button
                    onClick={() => sendBillEmail(profile)}
                    className="bg-blue-500 text-white p-2 rounded mt-2 w-full text-sm sm:text-base hover:bg-blue-600 transition"
                >
                    Send Bill
                </button>
                <button
                    onClick={() => setShowBillModal(false)}
                    className="absolute top-2 right-2 text-sm sm:text-base"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
export default BillModal;
