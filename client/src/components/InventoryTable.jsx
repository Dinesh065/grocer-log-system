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
    <div className='overflow-x-auto'>
      <table className="w-full border-collapse shadow-lg">
        <thead className="table-header">
          <tr>
            <th className="table-header text-white">Item Name</th>
            <th className="table-header text-white">SKU</th>
            <th className="table-header text-white">Quantity</th>
            <th className="table-header text-white">Status</th>
            <th className="table-header text-white">Date Added</th>
            <th className="table-header text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.sku}>
              {editItemSku === item.sku ? (
                <>
                  <td>
                    <input
                      type='text'
                      value={updatedItem.name || ""}
                      onChange={(e) => handleEditChange(e, 'name')}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td>{item.sku}</td>
                  <td>
                    <input
                      type='number'
                      value={updatedItem.qty || ""}
                      onChange={(e) => handleEditChange(e, 'qty')}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td>
                    <select
                      value={updatedItem.status || ""}
                      onChange={(e) => handleEditChange(e, 'status')}
                      className="border p-1 w-full"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </td>
                  <td>{item.dateAdded || 'N/A'}</td>
                  <td>
                    <button onClick={saveChanges} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.qty}</td>
                  <td>{item.status}</td>
                  <td>{item.dateAdded || 'N/A'}</td>
                  <td className="flex flex-row">
                    <FaEdit
                      className="action-icon"
                      onClick={() => handleUpdate(item.sku)}
                    />
                    <FaTrash
                      className="action-icon"
                      onClick={() => handleDelete(item.sku)}
                    />
                  </td>
                </>
              )}
            </tr>)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
