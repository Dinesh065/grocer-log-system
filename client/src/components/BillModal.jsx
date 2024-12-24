import React from 'react';
import '../App.css';

const BillModal = ({ selectedCustomer,sendBillEmail,setShowBillModal }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4">TAX INVOICE</h2>

            <h3 className="text-lg font-semibold">[Your Business Name]</h3>
            <p>[Your Business Address]</p>
            <p><strong>Phone:</strong> [Phone Number]</p>
            <p><strong>GSTIN:</strong> [Your GSTIN]</p>

            <hr className="my-4" />

            <h3 className="text-lg font-semibold">BILL TO:</h3>
            <p><strong>{selectedCustomer.name}</strong></p>
            <p><strong>Flat No:</strong> {selectedCustomer.flatNo}</p>
            <p><strong>Society:</strong> {selectedCustomer.societyName}</p>

            <hr className="my-4" />

            <table className="table-auto w-full">
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

            <p className="text-right"><strong>Total Pending:</strong> ${selectedCustomer.totalPending}</p>

            <button onClick={sendBillEmail} className="bg-blue-500 text-white p-2 rounded mt-2 w-full">
                Send Bill
            </button>
            <button onClick={() => setShowBillModal(false)} className="absolute top-2 right-2">
                Close
            </button>
        </div>
    </div>

);

export default BillModal;