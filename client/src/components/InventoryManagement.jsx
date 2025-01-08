import React, { useState, useEffect } from "react";
import InventoryPagination from "./InventoryPagination";
import InventoryToolbar from "./InventoryToolbar";
import InventoryTable from "./InventoryTable";
import AddNewItemForm from "./AddNewItemForm";
import axios from "axios"
import { useDashboard } from "./DashboardContext";

const Inventory = () => {
    
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const [showForm, setShowForm] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({});
    const [editItemSku, setEditItemSku] = useState(null); // To track the SKU of the item being edited

    const { setDashboardData } = useDashboard();

    // Load items from databas
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/inventory/items");
                if (response.status === 200) {
                    setItems(response.data);
                    setFilteredItems(response.data);
                } else {
                    console.error("Failed to fetch items:", response);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        // const totalItems = items.reduce((sum, item) => sum + (item.qty || 0), 0); // Assuming each item has a `qty` field
        const totalItems = items.length;
        setDashboardData((prev) => ({
            ...prev,
            totalItems,
        }));
    }, [items, setDashboardData]);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

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

    const handleAddNewItem = async (newItem) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/inventory/addnewitem", newItem);
            setItems([...items, response.data]);
            setFilteredItems([...items, response.data]);
            setShowForm(false);
            console.log("Data fetched: ", response);
        } catch (error) {
            console.error("Error fetching inventory:", error)
        }
    };

    const handleEditChange = (e, field) => {
        const value = e.target.value;
        setUpdatedItem((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    
    const handleUpdate = (sku) => {
        const itemToEdit = items.find((item) => item.sku === sku);
        if (!itemToEdit) {
            console.error("Item not found for SKU:", sku);
            return;
        }
        setUpdatedItem({ ...itemToEdit }); 
        setEditItemSku(sku); 
    };

    const saveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/inventory/update/${editItemSku}`, updatedItem);
            if (response.status === 200) {
                const newItems = items.map((item) =>
                    item.sku === editItemSku ? { ...item, ...updatedItem } : item
                );
                setItems(newItems);
                setFilteredItems(newItems);
                setEditItemSku(null);
                setUpdatedItem({});
                console.log("Item updated successfully.");
            }
        } catch (error) {
            console.error("Error updating the item: ", error);
        }
    };

    const handleDelete = async (sku) => {
        console.log("Item to delete (SKU):", sku);
        if (!sku) {
            console.error("SKU is undefined");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/inventory/deletebysku/${sku}`);
            if (response.status === 200) {
                const newItems = items.filter((item) => item.sku !== sku);
                setItems(newItems);
                setFilteredItems(newItems);
                console.log("Item deleted successfully.");
            }
        } catch (error) {
            console.error("Error deleting the item: ", error);
        }
    };

    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    // 
    return (
        <div style={{ backgroundColor: 'rgba(255, 228, 196, 0.8)', minHeight: '100vh', padding: '20px' }}>
            <h1 className="text-center bg-pink-200 text-pink-700 shadow-lg font-bold py-4 rounded-lg text-4xl mb-6 ">
                Welcome to Inventory Management!
            </h1>

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
                        handleUpdate={handleUpdate}
                        saveChanges={saveChanges}
                        handleDelete={handleDelete}
                        updatedItem={updatedItem}
                        editItemSku={editItemSku}
                        handleEditChange={handleEditChange}
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

