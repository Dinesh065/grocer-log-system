import React from 'react';

const SimpleNavbar = ({ onTryDemo }) => {
  return (
    <nav className="sticky top-0 flex justify-between items-center p-4 bg-gray-800 text-white shadow-md z-10">
      <div className="text-2xl font-bold">GrocerLog</div>
      <button
        onClick={onTryDemo}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-300"
      >
        Try Free Demo
      </button>
    </nav>
  );
};

export default SimpleNavbar;