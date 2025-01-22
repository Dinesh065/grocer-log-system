import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const CustomerTable = ({ filteredCustomers, viewDetails }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse shadow-lg">
      <thead>
        <tr className="text-white text-sm md:text-base">
          <th className="p-3 border-b bg-blue-600">Name</th>
          <th className="p-3 border-b bg-blue-600">Flat No</th>
          <th className="p-3 border-b bg-blue-600">Society Name</th>
          <th className="p-3 border-b bg-blue-600">Total Pending</th>
          <th className="p-3 border-b bg-blue-600">Status</th>
          <th className="p-3 border-b bg-blue-600">Date Range</th>
          <th className="p-3 border-b bg-blue-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredCustomers.map((customer) => (
          <tr
            key={uuidv4()}
            className="bg-gray-100 text-sm md:text-base hover:bg-gray-200 transition"
          >
            <td className="p-3 border-b">{customer.name}</td>
            <td className="p-3 border-b">{customer.flatNo}</td>
            <td className="p-3 border-b">{customer.societyName}</td>
            <td className="p-3 border-b">{customer.totalPending}</td>
            <td className="p-3 border-b">{customer.status}</td>
            <td className="p-3 border-b">
              {customer.startDate} - {customer.lastPurchase}
            </td>
            <td className="p-3 border-b">
              <button
                onClick={() => viewDetails(customer)}
                className="bg-yellow-500 text-white px-3 py-2 rounded shadow hover:bg-yellow-600 transition"
              >
                <FontAwesomeIcon icon={faEye} /> View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CustomerTable;

