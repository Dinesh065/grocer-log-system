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
    <div className="toolbar">
      <div className="relative w-[1100px]">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="w-[100%] h-[50px] bg-white shadow-lg rounded-lg p-2 flex-grow border border-gray-300 focus:outline-[gray] focus:ring-0 "
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
        className=" h-[50px] flex flex-col bg-white shadow-lg rounded-lg p-2  border border-gray-300"
      > 
        <option value="">All Statuses</option>
        <option value="In Stock">In Stock</option>
        <option value="Low">Low</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className=" h-[50px] flex flex-col bg-white shadow-lg rounded-lg p-2  border border-gray-300 "
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