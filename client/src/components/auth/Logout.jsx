import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout(); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-teal-500 to-blue-500 text-white">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Logout</h2>
        <p className="text-gray-600 mb-6">
          You are securely logged in. Click below to log out of your account.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;