import React from "react";

const Information = ({ packageDetails }) => {

  if (!packageDetails) {
    return (
      <div className="text-center h-screen">
        <p>No data available.</p>
      </div>
    )
  }



  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">

      <div>
        {/* Title and Price */}
        <div className="flex justify-between border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{packageDetails.title}</h1>
            <div className="flex space-x-4 text-gray-500 mt-2">
              <span>{packageDetails.duration}</span>
              <span>{packageDetails.age}</span>
              <span>{packageDetails.category}</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-green-600">${packageDetails.price}</h2>
            <p className="text-sm text-gray-500">per person</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4">{packageDetails.description}</p>

        {/* Details */}
        <p className="text-gray-600 mb-6">{packageDetails.details}</p>

        {/* Rating */}
        <div className="flex items-center text-yellow-500 space-x-2 mb-6">
          <span className="text-lg font-bold">{packageDetails.rating.stars} ★</span>
          <span className="text-sm text-gray-500">({packageDetails.rating.reviews} Reviews)</span>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Departure/Return Location</h3>
            <p className="text-gray-600">{packageDetails.departureLocation}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Departure Time</h3>
            <p className="text-gray-600">{packageDetails.departureTime}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Return Time</h3>
            <p className="text-gray-600">{packageDetails.returnTime}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Dress Code</h3>
            <p className="text-gray-600">{packageDetails.dressCode}</p>
          </div>
        </div>

        {/* Included/Not Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Included</h3>
            <ul className="list-disc list-inside text-gray-600">
              {packageDetails.included.map((include, idx) => (
                <li key={idx}>{include}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Not Included</h3>
            <ul className="list-disc list-inside text-gray-600">
              {packageDetails.notIncluded.map((notInclude, idx) => (
                <li key={idx}>{notInclude}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Information;
