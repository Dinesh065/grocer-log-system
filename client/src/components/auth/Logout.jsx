import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#050a14] to-[#0d1321] text-white p-4">
      <div className="bg-[#1a2235] shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Logout</h2>
        <p className="text-sm md:text-base text-gray-300 mb-6">
          You are securely logged in. Click below to log out of your account.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>

  );
};

export default Logout;
