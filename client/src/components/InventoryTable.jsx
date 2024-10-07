import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const InventoryTable = ({ items, handleDelete, handleUpdate }) => {
  return (
    <table style={{marginLeft: '30px'}}>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>SKU</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Date Added</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.sku}</td>
            <td>{item.qty}</td>
            <td>{item.status}</td>
            <td>{item.dateAdded || 'N/A'}</td>  {/* Ensuring Date Added column is not empty */}
            <td className='flex flex-row'>
              <FaEdit className="action-icon" onClick={() => handleUpdate(item.id)}/>
              <FaTrash className="action-icon" onClick={() => handleDelete(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;