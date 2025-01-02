import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import CustomerTable from './CustomerTable';
import CustomerDetails from './CustomerDetails';
import AddNewCustomerForm from './AddNewCustomerForm';
import AddPurchaseForm from './AddPurchaseForm';
import BillModal from './BillModal';
import { useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';
import { useDashboard } from './DashboardContext';
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
        id: uuidv4(), // Generate UUID
        name: '', flatNo: '', societyName: '', email: '', totalPending: 0, startDate: '', lastPurchase: '', purchases: [], status: 'Pending'
    });
    const [purchaseDetails, setPurchaseDetails] = useState({
        id: uuidv4(), // Generate UUID
        name: '', quantity: 1, pricePerItem: 0, total: 0
    });
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [isAddPurchaseVisible, setIsAddPurchaseVisible] = useState(false);

    const [showBillModal, setShowBillModal] = useState(false);
    const [customerEmail, setCustomerEmail] = useState('');

    const { setDashboardData } = useDashboard();

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.societyName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDateRange = (!dateRange.start || new Date(customer.startDate) >= new Date(dateRange.start)) &&
            (!dateRange.end || new Date(customer.lastPurchase) <= new Date(dateRange.end));

        return matchesSearch && matchesDateRange;
    });

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Ensure two digits
        const day = String(d.getDate()).padStart(2, '0'); // Ensure two digits
        return `${year}-${month}-${day}`;
    };

    const viewDetails = (customer) => {
        setSelectedCustomer(customer);
        setIsAddPurchaseVisible(false);
    };

    const addNewCustomer = async () => {
        try {
            const currentDate = formatDate(new Date());
            const customerData = {
                ...newCustomer,
                id: uuidv4(), // Assign UUID
                startDate: currentDate,
                lastPurchase: currentDate,
                status: 'Pending'
            };
            const response = await axios.post('http://localhost:8000/api/v1/customers/addnewcustomer', customerData);
            if (response.status === 201) {
                const updatedCustomers = [...customers, response.data];
                setCustomers(updatedCustomers);
                setNewCustomer({
                    id: uuidv4(), // Reset with new UUID
                    name: '',
                    flatNo: '',
                    societyName: '',
                    email: '',
                    totalPending: 0,
                    startDate: '',
                    lastPurchase: '',
                    purchases: [],
                    status: 'Pending'
                });
            } else {
                console.error('Failed to add customer. Server response:', response);
            }
        } catch (error) {
            console.error('Error while adding customer:', error);
        }
    };


    const addNewPurchase = async () => {
        if (!purchaseDetails.name || purchaseDetails.quantity <= 0 || purchaseDetails.pricePerItem <= 0) {
            alert('Please provide valid purchase details.');
            return;
        }

        try {
            const currentDate = formatDate(new Date());
            const newPurchase = {
                id: uuidv4(), // Generate a unique ID
                name: purchaseDetails.name,
                quantity: purchaseDetails.quantity,
                pricePerItem: purchaseDetails.pricePerItem,
                total: purchaseDetails.quantity * purchaseDetails.pricePerItem,
                date: currentDate,
            };

            const updatedCustomer = {
                ...selectedCustomer,
                purchases: [...selectedCustomer.purchases, newPurchase],
                totalPending: selectedCustomer.totalPending + newPurchase.total,
                lastPurchase: currentDate,
            };

            const response = await axios.put(`http://localhost:8000/api/v1/customers/${selectedCustomer._id}/updatepurchase`, updatedCustomer);

            if (response.status === 200) {
                setCustomers(customers.map((c) => (c._id === selectedCustomer._id ? response.data : c)));
                setSelectedCustomer(response.data);
                setPurchaseDetails({ id: uuidv4(), name: '', quantity: 1, pricePerItem: 0, total: 0 });
                setIsAddPurchaseVisible(false);
            } else {
                console.error('Failed to add purchase. Server response:', response);
            }
        } catch (error) {
            console.error('Error while adding purchase:', error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/customers');
            if (response.status === 200) {
                setCustomers(response.data);
            } else {
                console.error('Failed to fetch customers:', response);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        const totalCredits = customers.reduce((sum, customer) => sum + (customer.totalPending || 0), 0);
        setDashboardData((prev) => ({
            ...prev,
            totalCredits,
        }));
    }, [customers, setDashboardData]);
    
    useEffect(() => {
        fetchCustomers();
    }, []);

    const markAsPaid = async () => {
        try {
            const paidDate = formatDate(new Date());
            const updatedCustomer = {
                ...selectedCustomer,
                status: 'Paid',
                totalPending: 0,
                paidOn: paidDate
            };
            const response = await axios.put(`http://localhost:8000/api/v1/customers/${selectedCustomer._id}/markAsPaid`, updatedCustomer);
            if (response.status === 200) {
                setSelectedCustomer(response.data);
                setCustomers(customers.map(c => c.id === updatedCustomer.id ? response.data : c));
            }
            else {
                console.error('Failed to mark customer as paid. Server response:', response);
            }
        } catch (error) {
            console.error('Error marking customer as paid:', error);
        }
    };

    const deleteCustomer = async () => {
        try {
            if (!selectedCustomer) return;

            const response = await axios.delete(`http://localhost:8000/api/v1/customers/${selectedCustomer._id}/deleteCustomer`);

            if (response.status === 200) {
                // Update state after successful deletion
                setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
                setSelectedCustomer(null);
            } else {
                console.error('Failed to delete customer. Server response:', response);
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const deleteItem = async (index) => {
        try {
            if (!selectedCustomer) return;

            // Create the updated customer data after removing the item
            const updatedPurchases = selectedCustomer.purchases.filter((_, idx) => idx !== index);
            const updatedTotalPending = updatedPurchases.reduce((sum, purchase) => sum + purchase.total, 0);
            const updatedCustomer = {
                ...selectedCustomer,
                purchases: updatedPurchases,
                totalPending: updatedTotalPending,
            };

            console.log('Deleting customer with ID:', selectedCustomer._id);

            // Make an API call to update the customer data
            const response = await axios.put(`http://localhost:8000/api/v1/customers/${selectedCustomer._id}/updatePurchases`, updatedCustomer);

            if (response.status === 200) {
                // Update the state with the updated customer data
                setSelectedCustomer(response.data);
                setCustomers(customers.map(c => c.id === updatedCustomer.id ? response.data : c));
            } else {
                console.error('Failed to update customer purchases. Server response:', response);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const generateBill = () => {
        setShowBillModal(true);
    };

    // const sendBillEmail = () => {
    //     // if (!customerEmail) {
    //     //     alert("Please enter the customer's email address.");
    //     //     return;
    //     // }
    //     // Logic to send email (e.g., using EmailJS or backend API)
    //     alert(`Bill sent successfully`);
    //     setShowBillModal(false);
    // };

    const sendBillEmail = async () => {
        if (!selectedCustomer || !selectedCustomer.email) {
            alert('Customer email not available.');
            return;
        }

        try {
            // Prepare email data
            const emailData = {
                to_email: selectedCustomer.email,
                customer_name: selectedCustomer.name,
                invoice_data: JSON.stringify(selectedCustomer.purchases, null, 2), // Customize as needed
                total_pending: selectedCustomer.totalPending,
            };

            // Send email using emailjs
            await emailjs.send(
                'your_service_id', // Replace with your EmailJS service ID
                'your_template_id', // Replace with your EmailJS template ID
                emailData,
                'your_user_id' // Replace with your EmailJS user ID
            );

            alert('Bill sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send the bill.');
        }
    };

    const openBillModal = (customer) => {
        setSelectedCustomer(customer);
        setShowBillModal(true);
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
                <button onClick={() => setSelectedCustomer({ newCustomer })}>
                    <FontAwesomeIcon icon={faPlus} /> Add New Customer
                </button>
            </div>

            {selectedCustomer && selectedCustomer.newCustomer ? (
                <AddNewCustomerForm setNewCustomer={setNewCustomer} newCustomer={newCustomer} addNewCustomer={addNewCustomer} setSelectedCustomer={setSelectedCustomer} />
            ) : !selectedCustomer ? (
                <CustomerTable filteredCustomers={filteredCustomers} viewDetails={viewDetails} />
            ) : (
                <CustomerDetails setSelectedCustomer={setSelectedCustomer} selectedCustomer={selectedCustomer} deleteItem={deleteItem} setShowAddNewSaleForm={setShowAddNewSaleForm} showAddNewSaleForm={showAddNewSaleForm} deleteCustomer={deleteCustomer} markAsPaid={markAsPaid} generateBill={generateBill} purchaseDetails={purchaseDetails} setPurchaseDetails={setPurchaseDetails} addNewPurchase={addNewPurchase} />
            )}

            {/* {showBillModal && selectedCustomer && (
                <BillModal selectedCustomer={selectedCustomer} sendBillEmail={sendBillEmail} setShowBillModal={setShowBillModal} />
            )} */}
            {showBillModal && selectedCustomer && (
                <BillModal
                    selectedCustomer={selectedCustomer}
                    sendBillEmail={sendBillEmail}
                    setShowBillModal={setShowBillModal}
                />
            )}
        </div>
    );
};

export default CustomerCredit;
