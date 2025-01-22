import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SimpleNavbar from "./SimpleNavbar.jsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleTryDemo = () => setShowDemoModal(true);

  const handleDemoSubmit = async () => {
    if (validateEmail(email)) {
      try {
        const url = "http://localhost:8000/api/v1/users/demo";
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
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-red-300 to-yellow-300 text-white">
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
          Welcome to <span className="text-yellow-300">Grocer Log</span> System
        </motion.h1>
        <motion.p className="text-lg lg:text-2xl font-light mb-8" variants={fadeUpVariant}>
          Manage your inventory, sales, and customer logs effortlessly.
        </motion.p>
        <motion.div className="flex gap-6" variants={fadeUpVariant}>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-700 text-lg rounded-md transition-transform transform hover:scale-110"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-500 hover:bg-green-700 text-lg rounded-md transition-transform transform hover:scale-110"
          >
            Sign Up
          </button>
        </motion.div>
      </motion.div>

      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        className="py-12 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 relative overflow-hidden"
      >
        <h2 className="text-4xl font-bold text-center mb-8">Why Choose Grocer Log?</h2>

        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 px-6 lg:px-16 mb-12">
          <motion.div
            className="lg:w-1/2"
            variants={slideInLeftVariant}
          >
            <h3 className="text-3xl font-bold mb-4">Inventory Management</h3>
            <p className="text-lg">
              Track and manage your stock efficiently with our tools.
            </p>
          </motion.div>
          <motion.img
            src="/Inventoryimage.png"
            alt="Inventory Management"
            className="lg:w-[45%] w-full h-auto rounded-lg shadow-md"
            variants={slideInRightVariant}
          />
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full gap-6 px-6 lg:px-16 mb-12">
          <motion.div
            className="lg:w-1/2"
            variants={slideInRightVariant}
          >
            <h3 className="text-3xl font-bold mb-4">Sales Logs</h3>
            <p className="text-lg">
              Keep a record of all your sales in one place.
            </p>
          </motion.div>
          <motion.img
            src="/SalesImage.png"
            alt="Sales Log"
            className="lg:w-[45%] w-full h-auto rounded-lg shadow-md"
            variants={slideInLeftVariant}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 px-6 lg:px-16">
          <motion.div
            className="lg:w-1/2"
            variants={slideInLeftVariant}
          >
            <h3 className="text-3xl font-bold mb-4">Customer Credits</h3>
            <p className="text-lg">
              Manage pending payments and credits effortlessly.
            </p>
          </motion.div>
          <motion.img
            src="/CustomerCreditImage.png"
            alt="Customer Credits"
            className="lg:w-[45%] w-full h-auto rounded-lg shadow-md"
            variants={slideInRightVariant}
          />
        </div>
      </motion.section>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Grocer Log. All Rights Reserved.</p>
      </footer>

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
