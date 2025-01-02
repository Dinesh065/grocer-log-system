import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-orange-300 via-red-300 to-yellow-300 text-white text-center">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Grocer Log System</h1>
        <p className="text-2xl font-light">
          Manage your inventory, sales, and customer logs seamlessly.
        </p>
      </header>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-700 text-white text-lg rounded-md transition duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white text-lg rounded-md transition duration-300"
        >
          Sign Up
        </button>
        <button
          onClick={() => alert('Demo feature coming soon!')}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white text-lg rounded-md transition duration-300"
        >
          Try Demo
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
