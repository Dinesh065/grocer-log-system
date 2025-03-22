import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SimpleNavbar from "./SimpleNavbar.jsx";
import { API_BASE_URL } from "../config.jsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleTryDemo = () => setShowDemoModal(true);

  const handleDemoSubmit = async () => {
    if (validateEmail(email)) {
      try {
        const url = `${API_BASE_URL}/users/demo`;
        await axios.post(url, { email });
        sessionStorage.setItem("demoToken", "true");
        setShowDemoModal(false);
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        setError("Failed to submit email for demo. Please try again.");
      }
    } else {
      setError("Please enter a valid email address.");
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInLeftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const slideInRightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const [topSectionRef, topSectionInView] = useInView({ triggerOnce: false });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <SimpleNavbar onTryDemo={handleTryDemo} />

      <motion.div
        ref={topSectionRef}
        initial="hidden"
        animate={topSectionInView ? "visible" : "hidden"}
        variants={fadeUpVariant}
        className="flex flex-col justify-center items-center min-h-[70vh] text-center px-6 lg:px-16 py-10"
      >
        <motion.h1
          className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6"
          variants={fadeUpVariant}
        >
          Welcome to <span className="text-blue-400">Grocer Log</span> System
        </motion.h1>
        <motion.p className="text-lg lg:text-2xl font-light text-gray-300 mb-8" variants={fadeUpVariant}>
          Manage your inventory, sales, and customer logs effortlessly.
        </motion.p>
        <motion.div className="flex gap-6" variants={fadeUpVariant}>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-md transition-transform transform hover:scale-110 shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-lg rounded-md transition-transform transform hover:scale-110 shadow-lg"
          >
            Sign Up
          </button>
        </motion.div>
      </motion.div>

      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        className="py-12 text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black relative overflow-hidden"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-blue-400">Why Choose Grocer Log?</h2>

        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 px-6 lg:px-16 mb-12">
          <motion.div className="lg:w-1/2" variants={slideInLeftVariant}>
            <h3 className="text-3xl font-bold mb-4 text-green-400">Inventory Management</h3>
            <p className="text-lg text-gray-300">
              Track and manage your stock efficiently with our tools.
            </p>
          </motion.div>
          <motion.img
            src="/InventoryImage.png"
            alt="Inventory Management"
            className="lg:w-[45%] w-full h-auto rounded-lg shadow-lg border border-gray-700"
            variants={slideInRightVariant}
          />
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full gap-6 px-6 lg:px-16 mb-12">
          <motion.div className="lg:w-1/2" variants={slideInRightVariant}>
            <h3 className="text-3xl font-bold mb-4 text-yellow-400">Sales Logs</h3>
            <p className="text-lg text-gray-300">
              Keep a record of all your sales in one place.
            </p>
          </motion.div>
          <motion.img
            src="/SalesImage.png"
            alt="Sales Log"
            className="lg:w-[45%] w-full h-auto rounded-lg shadow-lg border border-gray-700"
            variants={slideInLeftVariant}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 px-6 lg:px-16">
          <motion.div className="lg:w-1/2" variants={slideInLeftVariant}>
            <h3 className="text-3xl font-bold mb-4 text-purple-400">Customer Credits</h3>
            <p className="text-lg text-gray-300">
              Manage pending payments and credits effortlessly.
            </p>
          </motion.div>
          <motion.img
            src="/CustomerCreditImage.png"
            alt="Customer Credits"
            className="lg:w-[45%] w-full h-auto rounded-lg shadow-lg border border-gray-700"
            variants={slideInRightVariant}
          />
        </div>
      </motion.section>

      <footer className="bg-gray-900 text-gray-300 py-6 text-center border-t border-gray-700">
        <p>&copy; 2025 Grocer Log. All Rights Reserved.</p>
      </footer>

      {showDemoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 p-6 rounded-md text-white shadow-lg border border-gray-600">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Enter your email to try the demo</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-600 bg-gray-700 text-white p-2 mb-4 w-full placeholder-gray-400"
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
