import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileInvoiceDollar, faEye } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const CustomerCredit = () => {
    const [customers, setCustomers] = useState([
        // Sample data
    ]);
    const [showAddNewSaleForm, setShowAddNewSaleForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [newCustomer, setNewCustomer] = useState({
        name: '', flatNo: '', societyName: '', totalPending: 0, startDate: '', lastPurchase: '', purchases: [], status: 'Pending'
    });
    const [purchaseDetails, setPurchaseDetails] = useState({ name: '', quantity: 1, pricePerItem: 0, total: 0 });
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [isAddPurchaseVisible, setIsAddPurchaseVisible] = useState(false);

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
        const updatedCustomers = [...customers, { ...newCustomer, id: customers.length + 1, startDate: currentDate, lastPurchase: currentDate }];
        setCustomers(updatedCustomers);
        setNewCustomer({ name: '', flatNo: '', societyName: '', totalPending: 0, startDate: '', lastPurchase: '', purchases: [], status: 'Pending' });
    };

    const addNewPurchase = () => {
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
        const updatedCustomer = { ...selectedCustomer, status: 'Paid', totalPending: 0 };
        setSelectedCustomer(updatedCustomer);
        setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    };

    const generateBill = () => {
        alert(`Bill sent to ${selectedCustomer.name}`);
    };

    return (
        <div style={{ backgroundColor: 'rgba(255, 228, 196, 0.8)', minHeight: '100vh', padding: '20px' }} className=''>
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

                <button onClick={() => setSelectedCustomer({newCustomer})}>
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
                    <p>Total Pending: {selectedCustomer.totalPending}</p>

                    <h4 className='mt-5 mb-2'>Purchases:</h4>
                    <table className="purchase-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price Per Item</th>
                                <th>Total</th>
                                <th>Date</th>
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
                    <button onClick={markAsPaid} className="mark-as-paid">Mark as Paid</button>
                    <button onClick={generateBill}><FontAwesomeIcon icon={faFileInvoiceDollar} /> Generate Bill</button>


                    <button onClick={() => setSelectedCustomer(null)}>Back</button>
                </div>
            )}
        </div>
    );
};

export default CustomerCredit;
