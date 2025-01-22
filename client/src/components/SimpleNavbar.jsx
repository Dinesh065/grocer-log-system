import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SimpleNavbar = ({ onTryDemo }) => {
  return (
    <nav className="sticky top-0 flex justify-between items-center p-4 bg-gray-800 text-white shadow-md z-10">
      <div className="flex items-center space-x-2 text-green-500 text-2xl font-bold">
        <ShoppingCartIcon className="text-green-500" fontSize="large" />
        <span>Grocer Log</span>
      </div>

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
