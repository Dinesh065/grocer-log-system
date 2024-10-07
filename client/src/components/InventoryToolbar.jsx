import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
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
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredSuggestions = value
      ? ['Electronics', 'Furniture', 'Clothing'].filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    setSuggestions(filteredSuggestions);

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
    <div className="toolbar pt-5 pl-3 relative">
      <div className="relative w-[800px]">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="w-full h-[40px] border border-gray-300 focus:outline-none focus:ring-0 pl-8 pr-2"
        />

        {suggestions.length > 0 && (
          <ul className="autocomplete-suggestions absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
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
        className="ml-4"
      >
        <option value="">All Statuses</option>
        <option value="In Stock">In Stock</option>
        <option value="Low">Low</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="ml-4"
      >
        <option value="">Sort By</option>
        <option value="name">Item Name</option>
        <option value="qty">Quantity</option>
      </select>

      {/* Add icon that shows the add new item form */}
      <button className="mui-add-button ml-4" onClick={showAddNewItemForm}>
        <AddIcon className="mui-icon" />
      </button>
    </div>
  );
};

export default InventoryToolbar;