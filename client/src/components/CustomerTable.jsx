import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import '../App.css';

const CustomerTable = ({ filteredCustomers, viewDetails }) => (
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
                <tr key={uuidv4()}>
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
);

export default CustomerTable;
