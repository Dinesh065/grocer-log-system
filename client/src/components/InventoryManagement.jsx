import React, { useState, useEffect } from "react";
import InventoryPagination from "./InventoryPagination";
import InventoryToolbar from "./InventoryToolbar";
import InventoryTable from "./InventoryTable";
import AddNewItemForm from "./AddNewItemForm";
import axios from "axios";
import Footer from "./Footer";
import { useDashboard } from "./DashboardContext";
import { API_BASE_URL } from "../config";

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
    const [editItemSku, setEditItemSku] = useState(null);
    const { setDashboardData } = useDashboard();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`${API_BASE_URL}/inventory/items`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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
        const totalItems = items.length;
        setDashboardData((prev) => ({
            ...prev,
            totalItems,
        }));
    }, [items, setDashboardData]);

    useEffect(() => {
        let newFilteredItems = items;

        if (searchTerm) {
            newFilteredItems = newFilteredItems.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.sku.includes(searchTerm)
            );
        }

        if (filterStatus) {
            newFilteredItems = newFilteredItems.filter(
                (item) => item.status?.toLowerCase() === filterStatus.toLowerCase()
            );
        }

        if (sortBy) {
            newFilteredItems = [...newFilteredItems].sort((a, b) =>
                sortBy === "name"
                    ? a.name.localeCompare(b.name)
                    : sortBy === "qty"
                        ? b.qty - a.qty
                        : 0
            );
        }

        setFilteredItems(newFilteredItems);
    }, [items, searchTerm, filterStatus, sortBy]);

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    const handleAddNewItem = async (newItem) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${API_BASE_URL}/inventory/addnewitem`, newItem, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItems([...items, response.data]);
            setFilteredItems([...items, response.data]);
            setShowForm(false);
        } catch (error) {
            console.error("Error adding new item:", error);
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
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `${API_BASE_URL}/inventory/update/${editItemSku}`,
                updatedItem,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                const newItems = items.map((item) =>
                    item.sku === editItemSku ? { ...item, ...response.data.data } : item
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
        if (!sku) {
            console.error("SKU is undefined");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(`${API_BASE_URL}/inventory/deletebysku/${sku}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
    
    return (
        <div>
            <div style={{ backgroundColor: '#050a14', minHeight: '100vh', padding: '20px' }}>
                <InventoryToolbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    handleClearSearch={handleClearSearch}
                    showAddNewItemForm={() => setShowForm(true)}
                    items={items}
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
                            handleEditChange={(e, field) =>
                                setUpdatedItem((prevState) => ({ ...prevState, [field]: e.target.value }))
                            }
                        />
                        <InventoryPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Inventory;
