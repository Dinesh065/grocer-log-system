import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SimpleNavbar from './SimpleNavbar.jsx';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleTryDemo = () => {
    setShowDemoModal(true);
  };

  const handleDemoSubmit = async () => {
    if (validateEmail(email)) {
      try {
        const url = "http://localhost:8000/api/v1/users/demo";
        await axios.post(url, { email });
        sessionStorage.setItem('demoToken', 'true');
        setShowDemoModal(false);
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        setError('Failed to submit email for demo. Please try again.');
      }
    } else {
      setError('Please enter a valid email address.');
    }
  };  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-red-300 to-yellow-300 text-white">
      <SimpleNavbar onTryDemo={handleTryDemo} />
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <header className="mb-8">
          <h1 className="text-5xl font-bold mb-4">Welcome to Grocer Log System</h1>
          <p className="text-2xl font-light">
            Manage your inventory, sales, and customer logs seamlessly.
          </p>
        </header>
        <div className="flex gap-6">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-700 text-white text-lg rounded-md transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white text-lg rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
      {showDemoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md text-black">
            <h2 className="text-xl font-bold mb-4">Enter your email to try the demo</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Enter your email"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              onClick={handleDemoSubmit}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;