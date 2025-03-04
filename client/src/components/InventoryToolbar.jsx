import React, { useState } from 'react';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

const InventoryToolbar = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  handleSearch,
  handleClearSearch,
  showAddNewItemForm,
  items,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = items
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.includes(searchTerm)
        )
        .map((item) => item.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, items]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      handleClearSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch();
    setSuggestions([]);
  };

  return (
    <div className="toolbar flex flex-wrap items-center gap-4 p-4 bg-gray-900 shadow-lg rounded-lg">
      <div className="relative w-full sm:w-auto flex-grow">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="w-full h-[50px] bg-[#0d1321] text-white shadow-lg rounded-lg p-2 border border-[#ffffff33] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-[#0d1321] border border-[#ffffff33] w-full mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-[#2a2a3b] cursor-pointer text-white"
                onClick={() => handleSuggestionClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="w-full sm:w-auto h-[50px] bg-[#0d1321] text-white shadow-lg rounded-lg p-2 border border-[#ffffff33] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full sm:w-auto h-[50px] bg-[#0d1321] text-white shadow-lg rounded-lg p-2 border border-[#ffffff33] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort By</option>
        <option value="name">Item Name</option>
        <option value="qty">Quantity</option>
      </select>

      <button
        className="flex items-center bg-[#30336b] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#535c91] transition duration-300 ease-in-out"
        onClick={showAddNewItemForm}
      >
        <AddIcon className="mr-2" />
        Add New Item
      </button>
    </div>

  );

};

export default InventoryToolbar;