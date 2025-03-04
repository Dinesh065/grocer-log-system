import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const CustomerTable = ({ filteredCustomers, viewDetails }) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-600 border-collapse shadow-lg">
      <thead>
        <tr className="text-white text-sm md:text-base">
          <th className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-100 ">Name</th>
          <th className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-100 ">Flat No</th>
          <th className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-100 ">Society Name</th>
          <th className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-100 ">Total Pending</th>
          <th className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-100 ">Status</th>
          <th className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-100 ">Date Range</th>
          <th className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-100 ">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredCustomers.map((customer) => (
          <tr
            key={uuidv4()}
            className="bg-[#0d1321] text-sm md:text-base hover:bg-gray-200 transition"
          >
            <td className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{customer.name}</td>
            <td className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{customer.flatNo}</td>
            <td className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{customer.societyName}</td>
            <td className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{customer.totalPending}</td>
            <td className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{customer.status}</td>
            <td className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">
              {customer.startDate} - {customer.lastPurchase}
            </td>
            <td className="p-3 bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">
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

