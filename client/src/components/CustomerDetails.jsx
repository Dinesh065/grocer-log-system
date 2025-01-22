import React from 'react';
import '../App.css';
import AddPurchaseForm from './AddPurchaseForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileInvoiceDollar, faEnvelope, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';

const CustomerDetails = ({ selectedCustomer, setSelectedCustomer, deleteItem, setShowAddNewSaleForm, showAddNewSaleForm, deleteCustomer, markAsPaid, generateBill, purchaseDetails, setPurchaseDetails, addNewPurchase }) => (
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
        <div className='overflow-x-auto'>
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
        </div>

        <button onClick={() => setShowAddNewSaleForm(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add New Purchase
        </button>

        {showAddNewSaleForm && (
            <AddPurchaseForm purchaseDetails={purchaseDetails} setPurchaseDetails={setPurchaseDetails} addNewPurchase={addNewPurchase} setShowAddNewSaleForm={setShowAddNewSaleForm} />
        )}
        <button onClick={deleteCustomer} className='ml-4 delete-button_1'>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete Customer
        </button>
        <button onClick={markAsPaid} className="mark-as-paid">Mark as Paid</button>
        <button onClick={generateBill} className='genereate-bill'><FontAwesomeIcon icon={faFileInvoiceDollar} /> Generate Bill</button>


        <button onClick={() => setSelectedCustomer(null)}>Back</button>
    </div>
);

export default CustomerDetails;