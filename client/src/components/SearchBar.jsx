import React, { useState } from 'react';

const SearchBar = () => {
  const items = [
    { id: 1, name: 'Item A', type: 'Category 1' },
    { id: 2, name: 'Item B', type: 'Category 2' },
    { id: 3, name: 'Item C', type: 'Category 1' },
    { id: 4, name: 'Item D', type: 'Category 3' },
    { id: 5, name: 'Item E', type: 'Category 2' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      const results = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="relative my-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-[1100px] px-4 py-2 ml-14 border border-[gray] rounded-md focus:outline-none focus:ring-0"
      />
      {filteredResults.length > 0 && (
        <ul className="absolute bg-white border ml-[55px] w-[1100px] mt-2 rounded-md shadow-lg">
          {filteredResults.map((result) => (
            <li key={result.id} className="p-2 hover:bg-gray-200 cursor-pointer">
              {result.name} ({result.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
