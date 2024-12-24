import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './StockAlert.css';

const InventoryTable = ({ items, handleDelete, handleUpdate, handleEditChange, editItemId, saveChanges, updatedItem }) => {
  return (
    <table style={{ marginLeft: '30px' }} className='shadow-lg'>
      <thead className='table-header'>
        <tr>
          <th className='table-header text-white'>Item Name</th>
          <th className='table-header text-white'>SKU</th>
          <th className='table-header text-white'>Quantity</th>
          <th className='table-header text-white'>Status</th>
          <th className='table-header text-white'>Date Added</th>
          <th className='table-header text-white'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            {editItemId === item.id ? (
              <>
                <td><input value={updatedItem.name} onChange={(e) => handleEditChange(e, 'name')} /></td>
                <td><input value={updatedItem.sku} onChange={(e) => handleEditChange(e, 'sku')} /></td>
                <td><input value={updatedItem.qty} onChange={(e) => handleEditChange(e, 'qty')} /></td>
                <td><input value={updatedItem.status} onChange={(e) => handleEditChange(e, 'status')} /></td>
                <td>{item.dateAdded || 'N/A'}</td>
                <td>
                  <button onClick={saveChanges}>Save</button>
                </td>
              </>
            ) : (
              <>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.qty}</td>
                <td>{item.status}</td>
                <td>{item.dateAdded || 'N/A'}</td>
                <td className='flex flex-row'>
                  <FaEdit className="action-icon" onClick={() => handleUpdate(item.id)} />
                  <FaTrash className="action-icon" onClick={() => handleDelete(item.id)} />
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
