import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const AllTrips = () => {
  const [packages, setPackages] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  useEffect(() => {
    axiosPublic
      .get('allTourPackages')
      .then((res) => setPackages(res.data))
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="text-center h-screen">
        <p>No data available.</p>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const paginatedPackages = packages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedPackages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white flex flex-col justify-between rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={pkg?.gallery?.[0]?.src} // Show the 1st image here
                alt={pkg.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-blue-500 font-semibold mb-2">
                  {pkg.tourType}
                </p>
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-lg font-semibold text-gray-600 mb-4">
                  {pkg.price}
                </p>
                <button
                  onClick={() => navigate(`/package-details/${pkg._id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  View Package
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTrips;
