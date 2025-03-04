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
import { useDashboard } from './DashboardContext';
import Footer from './Footer';
import '../App.css';

const CustomerCredit = () => {
    const [customers, setCustomers] = useState([]);
    const [showAddNewSaleForm, setShowAddNewSaleForm] = useState(false);
    const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [newCustomer, setNewCustomer] = useState({
        id: uuidv4(),
        name: '', flatNo: '', societyName: '', email: '', totalPending: 0, startDate: '', lastPurchase: '', purchases: [], status: 'Pending'
    });
    const [purchaseDetails, setPurchaseDetails] = useState({
        id: uuidv4(),
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
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const viewDetails = (customer) => {
        setSelectedCustomer(customer);
        setIsAddPurchaseVisible(false);
    };

    const addNewCustomer = async () => {
        try {
            const token = localStorage.getItem("token");
            const currentDate = formatDate(new Date());
            const customerData = {
                ...newCustomer,
                id: uuidv4(),
                startDate: currentDate,
                lastPurchase: currentDate,
                status: 'Pending',
            };

            const response = await axios.post(
                'http://localhost:8000/api/v1/customers/addnewcustomer',
                customerData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                const updatedCustomers = [...customers, response.data];
                setCustomers(updatedCustomers);
                setNewCustomer({
                    id: uuidv4(),
                    name: '',
                    flatNo: '',
                    societyName: '',
                    email: '',
                    totalPending: 0,
                    startDate: '',
                    lastPurchase: '',
                    purchases: [],
                    status: 'Pending',
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
            const token = localStorage.getItem("token");
            const currentDate = formatDate(new Date());
            const newPurchase = {
                id: uuidv4(),
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

            const response = await axios.put(`http://localhost:8000/api/v1/customers/${selectedCustomer._id}/updatepurchase`, updatedCustomer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:8000/api/v1/customers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
            const token = localStorage.getItem("token");
            const paidDate = formatDate(new Date());
            const updatedCustomer = {
                ...selectedCustomer,
                status: 'Paid',
                totalPending: 0,
                paidOn: paidDate
            };
            const response = await axios.put(`http://localhost:8000/api/v1/customers/${selectedCustomer._id}/markAsPaid`, updatedCustomer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
            const token = localStorage.getItem("token");

            if (!selectedCustomer) return;

            const response = await axios.delete(`http://localhost:8000/api/v1/customers/${selectedCustomer._id}/deleteCustomer`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
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
            const token = localStorage.getItem("token");

            if (!selectedCustomer) return;

            const updatedPurchases = selectedCustomer.purchases.filter((_, idx) => idx !== index);
            const updatedTotalPending = updatedPurchases.reduce((sum, purchase) => sum + purchase.total, 0);
            const updatedCustomer = {
                ...selectedCustomer,
                purchases: updatedPurchases,
                totalPending: updatedTotalPending,
            };

            const response = await axios.put(`http://localhost:8000/api/v1/customers/${selectedCustomer._id}/updatePurchases`, updatedCustomer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
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

    const sendBillEmail = async (profile) => {
        try {
            if (!profile || !profile.groceryName || !profile.groceryAddress || !profile.phoneNumber) {
                alert('Profile data is incomplete. Please update your profile.');
                return;
            }

            const billHtml = `
              <h2>TAX INVOICE</h2>
              <h3>${profile.groceryName}</h3>
              <p>${profile.groceryAddress}</p>
              <p><strong>Phone:</strong> ${profile.phoneNumber}</p>
              <p><strong>GSTIN:</strong> ${profile.gstin || '[Your GSTIN]'}</p>
              <hr />
              <h3>BILL TO:</h3>
              <p><strong>${selectedCustomer.name}</strong></p>
              <p><strong>Flat No:</strong> ${selectedCustomer.flatNo}</p>
              <p><strong>Society:</strong> ${selectedCustomer.societyName}</p>
              <hr />
              <table border="1" style="width:100%; text-align:center;">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${selectedCustomer.purchases
                    .map(
                        (purchase, idx) => `
                        <tr>
                          <td>${idx + 1}</td>
                          <td>${purchase.name}</td>
                          <td>${purchase.quantity}</td>
                          <td>$${purchase.pricePerItem}</td>
                          <td>$${purchase.total}</td>
                        </tr>
                      `
                    )
                    .join('')}
                </tbody>
              </table>
              <hr />
              <p><strong>Total Pending:</strong> $${selectedCustomer.totalPending}</p>
            `;

            const response = await axios.post(
                'http://localhost:8000/api/v1/customers/send-bill-email',
                {
                    email: selectedCustomer.email,
                    billHtml,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                alert('Bill sent successfully.');
                setShowBillModal(false);
            } else {
                console.error('Failed to send email:', response.data);
                alert('Failed to send bill. Please try again.');
            }
        } catch (error) {
            console.error('Error while sending bill email:', error);
            alert('An error occurred while sending the bill. Please try again.');
        }
    };

    return (
        <div>
            <div
                style={{ backgroundColor: '#050a14', minHeight: '100vh', padding: '20px' }}
                className="p-4 sm:p-6 lg:p-8 text-white"
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-6 space-y-4 lg:space-y-0 mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or society..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full lg:w-[60%] h-[50px] lg:h-[70px] bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)]  rounded-lg p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 text-white placeholder-gray-400 pl-8 pr-2"
                    />

                    <div className="flex flex-col bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-lg p-2 border border-gray-700 w-full lg:w-auto">
                        <label className="font-medium mb-1 text-gray-300">Filter by Date Range:</label>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-center space-y-2 sm:space-y-0">
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                placeholder="Start Date"
                                className="w-full sm:w-auto border border-gray-600 rounded-lg px-2 bg-gray-800 text-white focus:ring-gray-500"
                            />
                            <span className="hidden sm:block text-gray-400">-</span>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                placeholder="End Date"
                                className="w-full sm:w-auto border border-gray-600 rounded-lg px-2 bg-gray-800 text-white focus:ring-gray-500"
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-auto">
                        <button
                            onClick={() => setSelectedCustomer({ newCustomer })}
                            className="bg-green-700 text-white w-full lg:w-auto px-6 py-3 rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.7)] hover:bg-green-800 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Add New Customer
                        </button>
                    </div>
                </div>

                {selectedCustomer && selectedCustomer.newCustomer ? (
                    <AddNewCustomerForm
                        setNewCustomer={setNewCustomer}
                        newCustomer={newCustomer}
                        addNewCustomer={addNewCustomer}
                        setSelectedCustomer={setSelectedCustomer}
                    />
                ) : !selectedCustomer ? (
                    <CustomerTable filteredCustomers={filteredCustomers} viewDetails={viewDetails} />
                ) : (
                    <CustomerDetails
                        setSelectedCustomer={setSelectedCustomer}
                        selectedCustomer={selectedCustomer}
                        deleteItem={deleteItem}
                        setShowAddNewSaleForm={setShowAddNewSaleForm}
                        showAddNewSaleForm={showAddNewSaleForm}
                        deleteCustomer={deleteCustomer}
                        markAsPaid={markAsPaid}
                        generateBill={generateBill}
                        purchaseDetails={purchaseDetails}
                        setPurchaseDetails={setPurchaseDetails}
                        addNewPurchase={addNewPurchase}
                    />
                )}

                {showBillModal && selectedCustomer && (
                    <BillModal
                        selectedCustomer={selectedCustomer}
                        sendBillEmail={sendBillEmail}
                        setShowBillModal={setShowBillModal}
                    />
                )}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default CustomerCredit;
