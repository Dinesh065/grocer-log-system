import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-green-400">Grocer's Log System</h1>
          <p className="text-gray-300">
            Simplifying tasks for grocers by streamlining inventory, sales, and credit logs.
          </p>
          <p className="text-sm text-gray-400">© 2024 | Destiny | All rights reserved.</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/inventory" className="hover:underline hover:text-green-400">
                Inventory Log
              </Link>
            </li>
            <li>
              <Link to="/sales" className="hover:underline hover:text-green-400">
                Sales Log
              </Link>
            </li>
            <li>
              <Link to="/credits" className="hover:underline hover:text-green-400">
                Customer Credit Log
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline hover:text-green-400">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="text-gray-300">Email: dineshc93593@gmail.com</p>
          <p className="text-gray-300">Phone: 9359349132</p>
          <p className="text-gray-300">Address: Pune, Maharashtra</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100057340445217"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-400"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://x.com/DineshChou90368"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/dinesh-choudhary-4aa2082aa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm border-t border-gray-700 pt-4">
        Built with ❤️ by Destiny | Empowering Grocers Worldwide
      </div>
    </footer>
  );
};

export default Footer;
