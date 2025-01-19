import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const AllTourGuides = () => {
  const [touristGuide, setTouristGuide] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    axiosPublic
      .get('users/tourist-guides')
      .then((res) => setTouristGuide(res.data));
  }, []);

  if (!touristGuide) {
    return (
      <div className="text-center h-screen">
        <p>No data available.</p>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(touristGuide.length / itemsPerPage);
  const paginatedGuides = touristGuide.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paginatedGuides.map((guide) => (
            <div
              key={guide._id}
              className="bg-white border rounded-lg shadow-lg p-3 flex flex-col justify-between items-center text-center"
            >
              <img
                src={guide.photoURL}
                alt={guide.displayName}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{guide.displayName}</h3>
              <p className="text-blue-500 mb-1">{guide.specialization}</p>
              <p className="text-gray-600 text-left">{guide.bio}</p>
              <button
                onClick={() => navigate(`/tour-guide-profile/${guide._id}`)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                View Profile
              </button>
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

export default AllTourGuides;

