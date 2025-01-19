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
        <Link to="/"><h1 className=" text-2xl font-bold">Tourist Guide</h1></Link>
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
        <div className="md:hidden bg-gray-300 text-black shadow-lg">

          {/* Navigation Links */}
          <nav className="p-4 space-y-4">
            <Link to="/dashboard/manage-profile" ><SidebarLink icon={<FaUser />} label="Manage Profile" /></Link>
            <Link to="/dashboard/my-bookings" ><SidebarLink icon={<FaBook />} label="My Bookings" /></Link>
            <Link to="/dashboard/manage-stories" ><SidebarLink icon={<FaRegNewspaper />} label="Manage Stories" /></Link>
            <Link to="/dashboard/add-stories" ><SidebarLink icon={<FaPlusCircle />} label="Add Stories" /></Link>
            <Link to="/dashboard/join-tour-guide" ><SidebarLink icon={<FaUserTie />} label="Join as Tour Guide" /></Link>

            {/* tour Guide Route */}
            <Link to="/dashboard/my-assigned-tours" ><SidebarLink icon={<FaUserTie />} label="My Assigned Tours" /></Link>

            {/* Admin Route */}
            <Link to="/dashboard/manage-users" ><SidebarLink icon={<FaUserTie />} label="Manage Users" /></Link>
            <Link to="/dashboard/manage-candidates" ><SidebarLink icon={<FaUserTie />} label="Manage Candidates" /></Link>
            <Link to="/dashboard/add-package" ><SidebarLink icon={<FaUserTie />} label="Add Package" /></Link>

          </nav>
          
        </div>
      )}

      {/* Sidebar for Larger Screens */}
      <div className="hidden md:flex flex-col h-full bg-gray-300 text-black">
        {/* Logo Section */}
        <Link to="/" className="flex items-center justify-center h-20 bg-blue-700 shadow-md">
          <h1 className="text-2xl font-bold">Tourist Guide</h1>
        </Link>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-4">
          <Link to="/dashboard/manage-profile"><SidebarLink icon={<FaUser />} label="Manage Profile" /></Link>
          <Link to="/dashboard/my-bookings"><SidebarLink icon={<FaBook />} label="My Bookings" /></Link>
          <Link to="/dashboard/manage-stories"><SidebarLink icon={<FaRegNewspaper />} label="Manage Stories" /></Link>
          <Link to="/dashboard/add-stories"><SidebarLink icon={<FaPlusCircle />} label="Add Stories" /></Link>
          <Link to="/dashboard/join-tour-guide"><SidebarLink icon={<FaUserTie />} label="Join as Tour Guide" /></Link>

          {/* tour Guide Route */}
          <Link to="/dashboard/my-assigned-tours" ><SidebarLink icon={<FaUserTie />} label="My Assigned Tours" /></Link>

          {/* Admin Route */}
          <Link to="/dashboard/manage-users" ><SidebarLink icon={<FaUserTie />} label="Manage Users" /></Link>
          <Link to="/dashboard/manage-candidates" ><SidebarLink icon={<FaUserTie />} label="Manage Candidates" /></Link>
          <Link to="/dashboard/add-package" ><SidebarLink icon={<FaUserTie />} label="Add Package" /></Link>
        </nav>


      </div>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ icon, label }) => {
  return (
    <div className="flex items-center p-3 space-x-4 rounded-lg cursor-pointer hover:bg-blue-600 transition">
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default Sidebar;


