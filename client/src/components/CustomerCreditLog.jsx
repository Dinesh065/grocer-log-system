import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import CustomerTable from './CustomerTable';
import CustomerDetails from './CustomerDetails';
import AddNewCustomerForm from './AddNewCustomerForm';
import AddPurchaseForm from './AddPurchaseForm';
import BillModal from './BillModal';
import '../App.css';

const CustomerCredit = () => {
    const [customers, setCustomers] = useState([
        // Sample data
    ]);
    const [showAddNewSaleForm, setShowAddNewSaleForm] = useState(false);
    const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);  
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [newCustomer, setNewCustomer] = useState({
        name: '', flatNo: '', societyName: '', email: '', totalPending: 0, startDate: '', lastPurchase: '', purchases: [], status: 'Pending'
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
        setNewCustomer({ name: '', flatNo: '', societyName: '', email: '', totalPending: 0, startDate: '', lastPurchase: '', purchases: [], status: 'Pending' });
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
            <h1 className="text-center bg-pink-200 text-pink-700 shadow-lg font-bold py-4 rounded-lg text-4xl mb-6 ">Customer Credit Log</h1>

            <div className="customer-controls">
                <input
                    type="text"
                    placeholder="Search by name or society..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                <AddNewCustomerForm setNewCustomer={setNewCustomer} newCustomer={newCustomer} addNewCustomer={addNewCustomer} setSelectedCustomer={setSelectedCustomer} />
            ) : !selectedCustomer ? (
                <CustomerTable filteredCustomers={filteredCustomers} viewDetails={viewDetails}/>
            ) : (
                <CustomerDetails setSelectedCustomer={setSelectedCustomer} selectedCustomer={selectedCustomer} deleteItem={deleteItem} setShowAddNewSaleForm={setShowAddNewSaleForm} showAddNewSaleForm={showAddNewSaleForm} deleteCustomer={deleteCustomer} markAsPaid={markAsPaid} generateBill={generateBill} purchaseDetails={purchaseDetails} setPurchaseDetails={setPurchaseDetails} addNewPurchase={addNewPurchase} />
            )}

            {showBillModal && selectedCustomer && (
                <BillModal selectedCustomer={selectedCustomer} sendBillEmail={sendBillEmail} setShowBillModal={setShowBillModal}/>
            )}
        </div>
    );
};

export default CustomerCredit;
