import React from "react";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-black py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Website Name */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-lg font-bold">Tourist Guide</h2>
            <p>&copy; {new Date().getFullYear()} Tourist Guide. All rights reserved.</p>
          </div>

          {/* Contact Information */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold">Contact</h3>
            <p>Email: sakib21feb@gmail.com</p>
            <p>Phone: +8801521328038</p>
            <p>Address: Chittagong, Bangladesh</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 text-indigo-800">
            <a href="https://github.com/MuhammadNazmusSakib">
              <FaGithubSquare className="text-4xl cursor-pointer" />
            </a>
            <a href="https://www.linkedin.com/in/muhammad-nazmus-sakib/">
              <FaLinkedin className="text-4xl cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
