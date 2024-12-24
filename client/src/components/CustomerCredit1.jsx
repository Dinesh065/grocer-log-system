import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileInvoiceDollar, faEnvelope, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import axios from 'axios'

const CustomerCredit = () => {
    const [customers, setCustomers] = useState([
        // Sample data
    ]);
    const [showAddNewSaleForm, setShowAddNewSaleForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [newCustomer, setNewCustomer] = useState({
        name: '', flatNo: '', societyName: '',email: '', totalPending: 0, startDate: '', lastPurchase: '', purchases: [], status: 'Pending'
    });
    const [purchaseDetails, setPurchaseDetails] = useState({ name: '', quantity: 1, pricePerItem: 0, total: 0 });
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [isAddPurchaseVisible, setIsAddPurchaseVisible] = useState(false);

    const [showBillModal, setShowBillModal] = useState(false);
    const [customerEmail, setCustomerEmail] = useState('');

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.societyName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDateRange = (!dateRange.start || new Date(customer.startDate) >= new Date(dateRange.start)) &&
            (!dateRange.end || new Date(customer.lastPurchase) <= new Date(dateRange.end));

        return matchesSearch && matchesDateRange;
    });

    const viewDetails = (customer) => {
        setSelectedCustomer(customer);
        setIsAddPurchaseVisible(false);
    };

    const addNewCustomer = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        //Below instead of customers.length as Id use UUID i.e. unique ID generator to generate unique otherwise there could be duplication possible
        const updatedCustomers = [...customers, { ...newCustomer, id: customers.length + 1, startDate: currentDate, lastPurchase: currentDate }];
        setCustomers(updatedCustomers);
        setNewCustomer({ name: '', flatNo: '', societyName: '',email: '' , totalPending: 0, startDate: '', lastPurchase: '', purchases: [], status: 'Pending' });
    };

    const addNewPurchase = async () => {
        if (!purchaseDetails.name || purchaseDetails.quantity <= 0 || purchaseDetails.pricePerItem <= 0) {
            alert('Please provide valid purchase details.');
            return;
        }

        const newPurchase = {
            name: purchaseDetails.name,
            quantity: purchaseDetails.quantity,
            pricePerItem: purchaseDetails.pricePerItem,
            total: purchaseDetails.quantity * purchaseDetails.pricePerItem,
            date: new Date().toISOString().split('T')[0]
        };

        const updatedCustomer = {
            ...selectedCustomer,
            purchases: [...selectedCustomer.purchases, newPurchase],
            totalPending: selectedCustomer.totalPending + newPurchase.total,
            lastPurchase: newPurchase.date
        };

        setSelectedCustomer(updatedCustomer);
        setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
        setPurchaseDetails({ name: '', quantity: 1, pricePerItem: 0, total: 0 });
        setIsAddPurchaseVisible(false);
    };

    const markAsPaid = () => {
        const paidDate = new Date().toISOString().split('T')[0];
        const updatedCustomer = {
            ...selectedCustomer,
            status: 'Paid',
            totalPending: 0,
            paidOn: paidDate
        };
        setSelectedCustomer(updatedCustomer);
        setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    };

    const deleteCustomer = () => {
        const updatedCustomers = customers.filter(c => c.id !== selectedCustomer.id);
        setCustomers(updatedCustomers);
        setSelectedCustomer(null);
    };

    const deleteItem = (index) => {
        if (!selectedCustomer) return;

        const updatedPurchases = selectedCustomer.purchases.filter((_, idx) => idx !== index);
        const updatedTotalPending = updatedPurchases.reduce((sum, purchase) => sum + purchase.total, 0);
        const updatedCustomer = {
            ...selectedCustomer,
            purchases: updatedPurchases,
            totalPending: updatedTotalPending,
        };

        setSelectedCustomer(updatedCustomer);
        setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    };

    const generateBill = () => {
        setShowBillModal(true);
    };

    const sendBillEmail = () => {
        // if (!customerEmail) {
        //     alert("Please enter the customer's email address.");
        //     return;
        // }
        // Logic to send email (e.g., using EmailJS or backend API)
        alert(`Bill sent successfully`);
        setShowBillModal(false);
    };



    return (
        <div style={{ backgroundColor: 'rgba(255, 228, 196, 0.8)', minHeight: '100vh', padding: '20px' }}>
            <h1 className="text-center bg-pink-200 text-pink-700 shadow-lg font-bold py-4 rounded-lg text-4xl mb-6 ">
                Welcome to Customer Credit Log
            </h1>

            <div className="customer-controls">
                <input
                    type="text"
                    placeholder="Search by name or society"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-[60%] h-[70px] bg-white shadow-lg rounded-lg p-2 flex-grow border border-gray-300 focus:outline-[gray] focus:ring-0 pl-8 pr-2"
                />

                <div className="ml-5 flex flex-col bg-white shadow-lg rounded-lg p-2 flex-grow border border-gray-300">
                    <label className=''>Filter by Date Range: </label>
                    <div className='flex space-x-4'>
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
                            placeholder="Start Date"
                            className='border border-blue-500 rounded-lg pl-1 pr-1'
                        />
                        <span> - </span>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
                            placeholder="End Date"
                            className='border border-blue-500 rounded-lg pl-1 pr-1'
                        />
                    </div>
                </div>

                <button onClick={() => setSelectedCustomer({ newCustomer })}>
                    <FontAwesomeIcon icon={faPlus} /> Add New Customer
                </button>

            </div>

            {selectedCustomer && selectedCustomer.newCustomer ? (
                <div className="add-customer-form border shadow-lg">
                    <h3>Add New Customer</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newCustomer.name}
                        onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Flat No."
                        value={newCustomer.flatNo}
                        onChange={e => setNewCustomer({ ...newCustomer, flatNo: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Society Name"
                        value={newCustomer.societyName}
                        onChange={e => setNewCustomer({ ...newCustomer, societyName: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Enter customer's email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    />
                    <button onClick={addNewCustomer} className='mr-5'>Submit</button>
                    <button onClick={() => setSelectedCustomer(null)}>Back</button>
                </div>
            ) : !selectedCustomer ? (
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Flat No</th>
                            <th>Society Name</th>
                            <th>Total Pending</th>
                            <th>Status</th>
                            <th>Date Range</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.flatNo}</td>
                                <td>{customer.societyName}</td>
                                <td>{customer.totalPending}</td>
                                <td>{customer.status}</td>
                                <td>{customer.startDate} - {customer.lastPurchase}</td>
                                <td>
                                    <button onClick={() => viewDetails(customer)}>
                                        <FontAwesomeIcon icon={faEye} /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="customer-details shadow-lg">
                    <h3>Customer Name: {selectedCustomer.name}</h3>
                    <p>Flat No: {selectedCustomer.flatNo}</p>
                    <p>Society: {selectedCustomer.societyName}</p>
                    <p>Email: {selectedCustomer.email}</p>
                    <p>Total Pending: {selectedCustomer.totalPending}</p>
                    {selectedCustomer.status === 'Paid' && (
                        <p className="text-green-600">Paid on: {selectedCustomer.paidOn}</p>
                    )}

                    <h4 className='mt-5 mb-2'>Purchases:</h4>
                    <table className="purchase-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price Per Item</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCustomer.purchases.map((purchase, idx) => (
                                <tr key={idx}>
                                    <td>{purchase.name}</td>
                                    <td>{purchase.quantity}</td>
                                    <td>{purchase.pricePerItem}</td>
                                    <td>{purchase.total}</td>
                                    <td>{purchase.date}</td>
                                    <td>
                                        <button onClick={() => deleteItem(idx)} className='ml-4 delete-button_1'>
                                            <FontAwesomeIcon icon={faTrashAlt} /> Delete Item
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button onClick={() => setShowAddNewSaleForm(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Add New Purchase
                    </button>

                    {showAddNewSaleForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className='bg-gray-300 mt-3 p-5 shadow-xl border flex flex-col mb-5 rounded-lg w-[50%]'>
                                <h4 className='font-bold text-[green]'>Add New Purchase:</h4>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={purchaseDetails.name}
                                    onChange={e => setPurchaseDetails({ ...purchaseDetails, name: e.target.value })}
                                    className='w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-300 mt-2'
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={purchaseDetails.quantity}
                                    onChange={e => setPurchaseDetails({ ...purchaseDetails, quantity: e.target.value })}
                                    className='w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-300'
                                />
                                <input
                                    type="number"
                                    placeholder="Price Per Item"
                                    value={purchaseDetails.pricePerItem}
                                    onChange={e => setPurchaseDetails({ ...purchaseDetails, pricePerItem: e.target.value })}
                                    className='w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-300'
                                />

                                <div className='flex'>
                                    <button className='purchase-button' onClick={addNewPurchase}>Add Purchase</button>
                                    <button
                                        className='close-button'
                                        onClick={() => setShowAddNewSaleForm(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <button onClick={deleteCustomer} className='ml-4 delete-button_1'>
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete Customer
                    </button>
                    <button onClick={markAsPaid} className="mark-as-paid">Mark as Paid</button>
                    <button onClick={generateBill} className='genereate-bill'><FontAwesomeIcon icon={faFileInvoiceDollar} /> Generate Bill</button>


                    <button onClick={() => setSelectedCustomer(null)}>Back</button>
                </div>
            )}

            {showBillModal && selectedCustomer && (
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

            )}

        </div>
    );
};

export default CustomerCredit;