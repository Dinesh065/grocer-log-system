import React, { useState, useEffect } from "react";
import InventoryPagination from "./InventoryPagination";
import InventoryToolbar from "./InventoryToolbar";
import InventoryTable from "./InventoryTable";
import AddNewItemForm from "./AddNewItemForm";

const Inventory = () => {
    // Load items from localStorage or set to default items
    const loadItemsFromLocalStorage = () => {
        const storedItems = localStorage.getItem('inventoryItems');
        return storedItems ? JSON.parse(storedItems) : [
            { id: 1, name: 'Electronics', sku: '001', qty: 50, status: 'In stock', dateAdded: '2024-09-01' },
            { id: 2, name: 'Furniture', sku: '002', qty: 30, status: 'In stock', dateAdded: '2024-09-02' },
            { id: 3, name: 'Clothes', sku: '003', qty: 40, status: 'In stock', dateAdded: '2024-09-02' },
            { id: 4, name: 'Brushes', sku: '004', qty: 0, status: 'Out of stock', dateAdded: '2024-09-02' },
            { id: 5, name: 'Utensils', sku: '005', qty: 0, status: 'Out of stock', dateAdded: '2024-09-03' },
            { id: 6, name: 'Soap', sku: '006', qty: 5, status: 'Low', dateAdded: '2024-09-04' },
            { id: 7, name: 'Furniture', sku: '007', qty: 30, status: 'Low', dateAdded: '2024-09-02' },
            { id: 8, name: 'Clothes', sku: '008', qty: 40, status: 'In stock', dateAdded: '2024-09-02' },
            { id: 9, name: 'Brushes', sku: '009', qty: 0, status: 'Out of stock', dateAdded: '2024-09-02' },
            { id: 10, name: 'Utensils', sku: '010', qty: 0, status: 'Out of stock', dateAdded: '2024-09-03' },
            { id: 11, name: 'Soap', sku: '011', qty: 5, status: 'Low', dateAdded: '2024-09-04' },
        ];
    };

    const [items, setItems] = useState(loadItemsFromLocalStorage());
    const [filteredItems, setFilteredItems] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        localStorage.setItem('inventoryItems', JSON.stringify(items));
        setFilteredItems(items);
    }, [items]);

    const [showForm, setShowForm] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({});

    const handleSearch = () => {
        const newFilteredItems = items
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.includes(searchTerm))
            .filter(item => (filterStatus ? item.status === filterStatus : true))
            .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : sortBy === 'qty' ? b.qty - a.qty : 0);

        setFilteredItems(newFilteredItems);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredItems(items);
        setCurrentPage(1);
    };

    const handleAddNewItem = (newItem) => {
        setItems([...items, newItem]);
        setFilteredItems([...items, newItem]);  
        setShowForm(false);  
    };

    const handleEditChange = (e, field) => {
        setUpdatedItem({ ...updatedItem, [field]: e.target.value });
    };

    const handleUpdate = (id) => {
        setEditItemId(id);
        const itemToEdit = items.find(item => item.id === id);
        setUpdatedItem({ ...itemToEdit });  
    };

    const saveChanges = () => {
        setItems(prevItems =>
            prevItems.map(item => (item.id === editItemId ? { ...item, ...updatedItem } : item))
        );
        setEditItemId(null);  
        setUpdatedItem({});  
    };
    

    const handleDelete = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        setFilteredItems(newItems);
    };

    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="container" style={{ backgroundColor: 'rgba(255, 228, 196, 0.8)', minHeight: '100vh', width: '100%' }}>
            <h1 className="text-center bg-[pink] text-[#f62f50] shadow-md font-bold">Welcome to the Inventory Management !!</h1>

            <InventoryToolbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
                showAddNewItemForm={() => setShowForm(true)}
            />

            {showForm ? (
                <AddNewItemForm handleAddNewItem={handleAddNewItem} onClose={() => setShowForm(false)} />
            ) : (
                <>
                    <InventoryTable
                        items={paginatedItems}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate} 
                        setUpdatedItem={setUpdatedItem} 
                        editItemId={editItemId}
                        handleEditChange={handleEditChange}
                        saveChanges={saveChanges}
                    />
                    <InventoryPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default Inventory;

