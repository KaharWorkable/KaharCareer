// src/components/Footer.js
import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            <FaTwitter className="text-2xl" />
          </a>
        </div>
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Kaharuddin. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
