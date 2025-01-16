import React, { useState } from "react";
import { FaUser, FaBook, FaRegNewspaper, FaPlusCircle, FaUserTie } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation()
  

  

  return (
    <div>
      {/* Dropdown Button for Small Screens */}
      <div className="md:hidden bg-blue-700 text-white flex justify-between items-center p-4">
        <h1 className=" text-2xl font-bold">Tourist Guide</h1>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isDropdownOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Sidebar for Small Screens (Dropdown) */}
      {isDropdownOpen && (
        <div className="md:hidden bg-gradient-to-t from-blue-400 to-purple-600 text-white shadow-lg">

          {/* Navigation Links */}
          <nav className="p-4 space-y-4">
            <Link to="/dashboard/manage-profile" ><SidebarLink icon={<FaUser />} label="Manage Profile" /></Link>
            <Link to="/dashboard/my-bookings" ><SidebarLink icon={<FaBook />} label="My Bookings" /></Link>
            <Link to="/dashboard/manage-stories" ><SidebarLink icon={<FaRegNewspaper />} label="Manage Stories" /></Link>
            <Link to="/dashboard/add-stories" ><SidebarLink icon={<FaPlusCircle />} label="Add Stories" /></Link>
            <Link to="/dashboard/join-tour-guide" ><SidebarLink icon={<FaUserTie />} label="Join as Tour Guide" /></Link>
          </nav>
         
        </div>
      )}

      {/* Sidebar for Larger Screens */}
      <div className="hidden md:flex flex-col h-screen bg-gradient-to-t from-blue-400 to-purple-600 text-white shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center justify-center h-20 bg-blue-700 shadow-md">
          <h1 className="text-2xl font-bold">Tourist Guide</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-4">
          <Link to="/dashboard/manage-profile"><SidebarLink icon={<FaUser />} label="Manage Profile" /></Link>
          <Link to="/dashboard/my-bookings"><SidebarLink icon={<FaBook />} label="My Bookings" /></Link>
          <Link to="/dashboard/manage-stories"><SidebarLink icon={<FaRegNewspaper />} label="Manage Stories" /></Link>
          <Link to="/dashboard/add-stories"><SidebarLink icon={<FaPlusCircle />} label="Add Stories" /></Link>
          <Link to="/dashboard/join-tour-guide"><SidebarLink icon={<FaUserTie />} label="Join as Tour Guide" /></Link>
        </nav>

        {/* Footer */}
        <div className="p-4 text-center text-sm bg-blue-800">
          <p>© 2025 Tourist Guide</p>
        </div>
      </div>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ icon, label }) => {
  return (
    <div className="flex items-center p-3 space-x-4 rounded-lg cursor-pointer hover:bg-green-600 transition">
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default Sidebar;


