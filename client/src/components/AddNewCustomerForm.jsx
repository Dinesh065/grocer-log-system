import React, { useState } from 'react';
import '../App.css';

const AddNewCustomerForm = ({ setNewCustomer,newCustomer, setSelectedCustomer,addNewCustomer }) => {

    return (
        <div className="add-customer-form border shadow-lg">
            <h3>Add New Customer</h3>
            <input
                type="text"
                placeholder="Name"
                value={newCustomer.name}
                onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Flat No."
                value={newCustomer.flatNo}
                onChange={e => setNewCustomer({ ...newCustomer, flatNo: e.target.value })}
            />
            <input
                type="text"
                placeholder="Society Name"
                value={newCustomer.societyName}
                onChange={e => setNewCustomer({ ...newCustomer, societyName: e.target.value })}
            />
            <input
                type="email"
                placeholder="Enter customer's email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
            <button onClick={addNewCustomer} className='mr-5'>Submit</button>
            <button onClick={() => setSelectedCustomer(null)}>Back</button>
        </div>
    );
};

export default AddNewCustomerForm;
