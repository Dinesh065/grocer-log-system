import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './StockAlert.css';
import { useState } from 'react';

const InventoryTable = ({
  items,
  handleDelete,
  handleUpdate,
  handleEditChange,
  editItemSku,
  saveChanges,
  updatedItem,
}) => {
  return (
    <div className="bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-lg p-6 overflow-x-auto">
      <table className="w-full border-collapse shadow-lg bg-[#1a1a2e] text-white">
        <thead className="table-header bg-[#30336b]">
          <tr>
            <th className="table-header bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white">Item Name</th>
            <th className="table-header bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white">SKU</th>
            <th className="table-header bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white">Quantity</th>
            <th className="table-header bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white">Status</th>
            <th className="table-header bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white">Date Added</th>
            <th className="table-header bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.sku} className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2">
              {editItemSku === item.sku ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={updatedItem.name || ""}
                      onChange={(e) => handleEditChange(e, "name")}
                      className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white p-1 w-full rounded"
                    />
                  </td>
                  <td>{item.sku}</td>
                  <td>
                    <input
                      type="number"
                      value={updatedItem.qty || ""}
                      onChange={(e) => handleEditChange(e, "qty")}
                      className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white p-1 w-full rounded"
                    />
                  </td>
                  <td>
                    <select
                      value={updatedItem.status || ""}
                      onChange={(e) => handleEditChange(e, "status")}
                      className="bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-2 text-white p-1 w-full rounded"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </td>
                  <td>{item.dateAdded || "N/A"}</td>
                  <td>
                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition" onClick={saveChanges}>
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className='bg-[#0d1321] border-gray-700 text-gray-300 border-t-0 border-r-0 border-l-0 border-b-2'>{item.name}</td>
                  <td className='bg-[#0d1321] border-gray-700 text-gray-300 border-t-0 border-r-0 border-l-0 border-b-2'>{item.sku}</td>
                  <td className='bg-[#0d1321] border-gray-700 text-gray-300 border-t-0 border-r-0 border-l-0 border-b-2'>{item.qty}</td>
                  <td className='bg-[#0d1321] border-gray-700 text-gray-300 border-t-0 border-r-0 border-l-0 border-b-2'>{item.status}</td>
                  <td className='bg-[#0d1321] border-gray-700 text-gray-300 border-t-0 border-r-0 border-l-0 border-b-2'>{item.dateAdded || "N/A"}</td>
                  <td className=" bg-[#0d1321] border-gray-700 border-t-0 border-r-0 border-l-0 border-b-0 space-x-2">
                    <div className='flex flex-row space-x-2'>
                      <FaEdit className="action-icon cursor-pointer text-gray-400 hover:text-blue-400 transition" onClick={() => handleUpdate(item.sku)} />
                      <FaTrash className="action-icon cursor-pointer text-gray-400 hover:text-red-400 transition" onClick={() => handleDelete(item.sku)} />
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
