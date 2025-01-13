import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
//import logo from '../../assets/images/logo.png';
import { Contex } from '../../ContexApi/Contex';

const Navbar = () => {
  const { user, logOut } = useContext(Contex); // Access user info and logout function
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-purple-50 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo and Website Name */}
        <Link to="/" className="flex items-center space-x-2">
          {/* <img src={logo} alt="Logo" className="w-10" /> */}
          <h1 className="text-xl font-bold">Tourist Guide</h1>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/community" className="hover:text-blue-600">Community</Link>
          <Link to="/about" className="hover:text-blue-600">About Us</Link>
          <Link to="/trips" className="hover:text-blue-600">Trips</Link>
        </nav>

        {/* Profile or Login/Register */}
        <div className="flex items-center space-x-4">
          {user ? (
            // Logged-in User
            <div className="relative">
              <img
                src={user.photoURL || 'https://via.placeholder.com/40'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                onClick={toggleDropdown}
              />
              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <div className="p-4 border-b">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/offers"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Offer Announcements
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logOut}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // Not Logged-in
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
